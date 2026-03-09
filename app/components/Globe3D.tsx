'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

function generateSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

function generateArcPoints(
  start: [number, number, number],
  end: [number, number, number],
  segments: number = 50,
  height: number = 0.3
): [number, number, number][] {
  const points: [number, number, number][] = [];
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  const midLen = mid.length();
  mid.normalize().multiplyScalar(midLen + height);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const t2 = t * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const x = mt2 * startVec.x + 2 * mt * t * mid.x + t2 * endVec.x;
    const y = mt2 * startVec.y + 2 * mt * t * mid.y + t2 * endVec.y;
    const z = mt2 * startVec.z + 2 * mt * t * mid.z + t2 * endVec.z;
    points.push([x, y, z]);
  }
  return points;
}

function latLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function DataArc({ start, end, speed }: {
  start: [number, number, number];
  end: [number, number, number];
  speed: number;
}) {
  const arcPoints = useMemo(() => generateArcPoints(start, end, 50, 0.4), [start, end]);
  const dashRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (dashRef.current) {
      dashRef.current.dashOffset -= delta * speed;
    }
  });

  return (
    <Line
      points={arcPoints}
      color="#ffffff"
      lineWidth={1}
      dashed
      dashScale={5}
      dashSize={0.5}
      dashOffset={0}
      ref={dashRef}
      transparent
      opacity={0.15}
    />
  );
}

function GlobeMesh() {
  const globeRef = useRef<THREE.Group>(null);

  const spherePoints = useMemo(() => generateSpherePoints(3000, 1.5), []);

  const connections = useMemo(() => {
    const cities = [
      { lat: 40.7, lng: -74 },
      { lat: 51.5, lng: -0.1 },
      { lat: 35.7, lng: 139.7 },
      { lat: 1.3, lng: 103.8 },
      { lat: 25.2, lng: 55.3 },
      { lat: -33.9, lng: 151.2 },
      { lat: -23.5, lng: -46.6 },
      { lat: 19.1, lng: 72.9 },
    ];

    const arcs: { start: [number, number, number]; end: [number, number, number] }[] = [];
    const r = 1.5;

    for (let i = 0; i < cities.length; i++) {
      for (let j = i + 1; j < cities.length; j++) {
        if (Math.random() > 0.5) {
          arcs.push({
            start: latLngToXYZ(cities[i].lat, cities[i].lng, r),
            end: latLngToXYZ(cities[j].lat, cities[j].lng, r),
          });
        }
      }
    }
    return arcs;
  }, []);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Outer wireframe */}
      <mesh>
        <sphereGeometry args={[1.48, 36, 36]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.03} />
      </mesh>

      {/* Inner wireframe grid */}
      <mesh>
        <sphereGeometry args={[1.49, 18, 18]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.015} />
      </mesh>

      {/* Point cloud */}
      <Points positions={spherePoints} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.006}
          sizeAttenuation
          depthWrite={false}
          opacity={0.25}
        />
      </Points>

      {/* Data arcs */}
      {connections.map((arc, i) => (
        <DataArc key={i} start={arc.start} end={arc.end} speed={0.3 + Math.random() * 0.3} />
      ))}

      {/* City nodes - white dots */}
      {[
        { lat: 40.7, lng: -74 },
        { lat: 51.5, lng: -0.1 },
        { lat: 35.7, lng: 139.7 },
        { lat: 1.3, lng: 103.8 },
        { lat: 25.2, lng: 55.3 },
        { lat: -33.9, lng: 151.2 },
        { lat: -23.5, lng: -46.6 },
        { lat: 19.1, lng: 72.9 },
      ].map((city, i) => {
        const pos = latLngToXYZ(city.lat, city.lng, 1.52);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
        );
      })}

      {/* Dark inner fill */}
      <mesh>
        <sphereGeometry args={[1.44, 32, 32]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<any>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
      ref.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.01} sizeAttenuation depthWrite={false} opacity={0.12} />
    </Points>
  );
}

export default function Globe3D() {
  return (
    <div className="w-full h-full globe-container">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <GlobeMesh />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
