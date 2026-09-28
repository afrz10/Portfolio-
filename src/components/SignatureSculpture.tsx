/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Signature 3D Sculpture Component
 * Faithful reproduction of the approved 3D organic sculpture from 01-hero-3d.png & 13-signature-3d.png:
 * - Smooth vertical S-curve flowing ribbon
 * - Outer pearlescent warm ivory / porcelain shell
 * - Inner core translucent leaf / sage green fluid volume
 * - Soft contact floor shadow & subtle studio rim lighting
 * - Mouse parallax reaction & subtle organic idle floating
 * - Section & scroll awareness without obscuring important typography
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SignatureSculptureProps {
  className?: string;
  size?: 'hero' | 'section' | 'mini' | 'ambient';
  interactive?: boolean;
}

export const SignatureSculpture: React.FC<SignatureSculptureProps> = ({
  className = '',
  size = 'hero',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfaf7f2, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffdf7, 2.4);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8fa88b, 1.8);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xf2ede4, 1.2);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Organic S-curve spine matching 13-signature-3d.png
    const curvePoints = [
      new THREE.Vector3(0, -1.8, 0),
      new THREE.Vector3(0.35, -1.5, 0.1),
      new THREE.Vector3(0.55, -0.9, 0.15),
      new THREE.Vector3(0.2, -0.1, 0.05),
      new THREE.Vector3(-0.35, 0.7, -0.05),
      new THREE.Vector3(-0.25, 1.4, 0.1),
      new THREE.Vector3(0.1, 1.8, 0.15),
      new THREE.Vector3(0.32, 1.65, 0.05),
      new THREE.Vector3(0.25, 1.35, -0.1),
    ];

    const spineCurve = new THREE.CatmullRomCurve3(curvePoints);
    spineCurve.curveType = 'centripetal';

    const tubularSegments = 160;
    const radialSegments = 48;
    const baseRadius = 0.32;

    const outerGeo = new THREE.TubeGeometry(spineCurve, tubularSegments, baseRadius, radialSegments, false);

    const pos = outerGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);

      const t = (y + 1.8) / 3.6;

      let radiusMultiplier = 1.0;
      if (t > 0.8) {
        radiusMultiplier = 1.0 + Math.sin((t - 0.8) / 0.2 * Math.PI) * 0.75;
      } else if (t < 0.2) {
        radiusMultiplier = 1.0 + Math.pow(1.0 - t / 0.2, 2) * 1.3;
      } else {
        radiusMultiplier = 0.85 + Math.sin(t * Math.PI) * 0.25;
      }

      pos.setX(i, x * radiusMultiplier);
      pos.setZ(i, z * radiusMultiplier * 0.82);
    }
    outerGeo.computeVertexNormals();

    // Material 1: Outer pearlescent warm ivory porcelain/glass shell
    const outerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbf8f3,
      emissive: 0x1f1f1d,
      emissiveIntensity: 0.02,
      roughness: 0.18,
      metalness: 0.05,
      transmission: 0.45,
      thickness: 1.2,
      ior: 1.48,
      clearcoat: 0.9,
      clearcoatRoughness: 0.12,
      specularColor: 0xffffff,
      specularIntensity: 0.85,
      transparent: true,
      opacity: 0.92,
    });

    const outerMesh = new THREE.Mesh(outerGeo, outerMaterial);
    sculptureGroup.add(outerMesh);

    // Material 2: Inner translucent sage-green fluid volume
    const innerCurvePoints = curvePoints.map((pt, idx) => {
      const offset = new THREE.Vector3(idx % 2 === 0 ? -0.06 : 0.04, 0, -0.08);
      return pt.clone().add(offset);
    });

    const innerCurve = new THREE.CatmullRomCurve3(innerCurvePoints);
    const innerGeo = new THREE.TubeGeometry(innerCurve, tubularSegments, baseRadius * 0.65, 32, false);

    const innerMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x7d9a78, // Approved muted leaf/sage green
      emissive: 0x3d543b,
      emissiveIntensity: 0.15,
      roughness: 0.22,
      metalness: 0.08,
      transmission: 0.72,
      thickness: 1.6,
      ior: 1.52,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: 0.88,
    });

    const innerMesh = new THREE.Mesh(innerGeo, innerMaterial);
    sculptureGroup.add(innerMesh);

    // Floor contact shadow disk
    const shadowGeo = new THREE.PlaneGeometry(3.6, 2.4);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(31, 31, 29, 0.22)');
      grad.addColorStop(0.3, 'rgba(60, 65, 58, 0.12)');
      grad.addColorStop(0.7, 'rgba(125, 154, 120, 0.04)');
      grad.addColorStop(1, 'rgba(250, 247, 242, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0.1, -1.82, 0);
    sculptureGroup.add(shadowMesh);

    if (size === 'hero') {
      sculptureGroup.position.set(0.2, 0.1, 0);
      sculptureGroup.scale.set(1.05, 1.05, 1.05);
    } else if (size === 'section') {
      sculptureGroup.position.set(0, 0, 0);
      sculptureGroup.scale.set(0.85, 0.85, 0.85);
    } else if (size === 'mini') {
      sculptureGroup.position.set(0, -0.2, 0);
      sculptureGroup.scale.set(0.55, 0.55, 0.55);
    } else {
      sculptureGroup.scale.set(0.75, 0.75, 0.75);
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetPosX = sculptureGroup.position.x;
    let targetPosY = sculptureGroup.position.y;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 300;
      const newH = container.clientHeight || 400;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const idleFloatY = Math.sin(elapsedTime * 0.8) * 0.04;
      const idleFloatRot = Math.cos(elapsedTime * 0.6) * 0.03;

      targetRotationY = mouseX * 0.28 + idleFloatRot;
      targetRotationX = -mouseY * 0.18;

      sculptureGroup.rotation.y += (targetRotationY - sculptureGroup.rotation.y) * 0.04;
      sculptureGroup.rotation.x += (targetRotationX - sculptureGroup.rotation.x) * 0.04;

      sculptureGroup.position.y += ((targetPosY + idleFloatY) - sculptureGroup.position.y) * 0.05;
      sculptureGroup.position.x += (targetPosX - sculptureGroup.position.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      innerGeo.dispose();
      outerMaterial.dispose();
      innerMaterial.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      renderer.dispose();
    };
  }, [interactive, size]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-label="AFRUZ signature 3D organic sculpture"
      role="img"
    >
      {!hasWebGL && (
        <svg
          viewBox="0 0 200 320"
          className="w-full h-full max-h-[460px] drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="100" cy="300" rx="60" ry="12" fill="rgba(31,31,29,0.12)" />
          <path
            d="M95 50 C130 50 145 90 130 140 C115 190 90 220 115 260 C125 275 140 285 105 290 C70 290 85 270 95 240 C110 200 135 170 115 125 C100 90 70 70 95 50 Z"
            fill="#7D9A78"
            opacity="0.85"
          />
          <path
            d="M90 40 C135 40 155 85 140 135 C125 185 100 215 120 255 C130 270 145 285 110 292 C60 292 70 275 85 245 C105 205 130 175 110 130 C95 95 60 70 90 40 Z"
            stroke="#FBF8F3"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </svg>
      )}
    </div>
  );
};
