"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Quaternion,
  Vector3,
  type Group,
} from "three";
import type { CSSProperties, ReactNode } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiCplusplus,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
} from "react-icons/si";

type Technology = {
  name: string;
  icon: ReactNode;
  color: string;
};

type SpherePoint = [number, number, number];

const technologies: Technology[] = [
  { name: "HTML", icon: <SiHtml5 />, color: "#e34f26" },
  { name: "CSS", icon: <SiCss />, color: "#1572b6" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178c6" },
  { name: "React", icon: <SiReact />, color: "#61dafb" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "#5fa04e" },
  { name: "Python", icon: <SiPython />, color: "#ffd43b" },
  { name: "C++", icon: <SiCplusplus />, color: "#00599c" },
  { name: "MySQL", icon: <SiMysql />, color: "#4479a1" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47a248" },
  { name: "Git", icon: <SiGit />, color: "#f05032" },
  { name: "GitHub", icon: <SiGithub />, color: "#ffffff" },
];

function fibonacciSphere(count: number, radius: number) {
  const points: SpherePoint[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const circleRadius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;

    points.push([
      Math.cos(theta) * circleRadius * radius,
      y * radius,
      Math.sin(theta) * circleRadius * radius,
    ]);
  }

  return points;
}

function createConstellationGeometry(pointCount: number, radius: number) {
  const nodes = fibonacciSphere(pointCount, radius);
  const nodeVertices = nodes.flat();
  const lineVertices: number[] = [];

  nodes.forEach((point, index) => {
    const neighbors = nodes
      .map((candidate, candidateIndex) => {
        const dx = point[0] - candidate[0];
        const dy = point[1] - candidate[1];
        const dz = point[2] - candidate[2];

        return {
          candidate,
          candidateIndex,
          distance: Math.sqrt(dx * dx + dy * dy + dz * dz),
        };
      })
      .filter(({ candidateIndex }) => candidateIndex > index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    neighbors.forEach(({ candidate }) => {
      lineVertices.push(...point, ...candidate);
    });
  });

  const nodeGeometry = new BufferGeometry();
  nodeGeometry.setAttribute("position", new Float32BufferAttribute(nodeVertices, 3));

  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute("position", new Float32BufferAttribute(lineVertices, 3));

  return { nodeGeometry, lineGeometry };
}

function ConstellationSphere() {
  const { nodeGeometry, lineGeometry } = useMemo(
    () => createConstellationGeometry(180, 1.35),
    [],
  );

  return (
    <>
      <points geometry={nodeGeometry}>
        <pointsMaterial
          size={0.018}
          color="#c4b5fd"
          transparent
          opacity={0.52}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.12}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <mesh>
        <sphereGeometry args={[1.35, 72, 72]} />
        <meshBasicMaterial
          color="#1d4ed8"
          wireframe
          transparent
          opacity={0.055}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[0.7, 0.25, 0.1]}>
        <sphereGeometry args={[1.39, 48, 48]} />
        <meshBasicMaterial
          color="#1e3a8a"
          wireframe
          transparent
          opacity={0.052}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function SkillMarker({
  tech,
  position,
}: {
  tech: Technology;
  position: SpherePoint;
}) {
  const markerRef = useRef<Group>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const worldPosition = useMemo(() => new Vector3(), []);
  const cameraDirection = useMemo(() => new Vector3(), []);

  useFrame(({ camera }) => {
    if (!markerRef.current || !contentRef.current) return;

    markerRef.current.getWorldPosition(worldPosition);
    cameraDirection.copy(camera.position).normalize();

    const depth = worldPosition.clone().normalize().dot(cameraDirection);
    const normalizedDepth = Math.max(0, Math.min(1, (depth + 1) / 2));
    const isFront = depth > 0.2;
    const opacity = 0.12 + normalizedDepth * 0.88;
    const scale = 0.62 + normalizedDepth * 0.42;

    contentRef.current.dataset.front = String(isFront);
    contentRef.current.style.opacity = opacity.toFixed(3);
    contentRef.current.style.transform = `scale(${scale.toFixed(3)})`;
    contentRef.current.style.zIndex = String(Math.round(normalizedDepth * 100));
  });

  return (
    <group ref={markerRef} position={position}>
      <Html center zIndexRange={[90, 0]}>
        <div
          ref={contentRef}
          className="globe-tech-item"
          style={{ "--tech-color": tech.color } as CSSProperties}
        >
          <div className="globe-tech-icon">{tech.icon}</div>
          <span>{tech.name}</span>
        </div>
      </Html>
    </group>
  );
}

function GlobeGroup() {
  const groupRef = useRef<Group>(null);
  const isDraggingRef = useRef(false);
  const previousTrackballPointRef = useRef<Vector3 | null>(null);
  const momentumRef = useRef(new Quaternion());
  const dragRotation = useMemo(() => new Quaternion(), []);
  const identityRotation = useMemo(() => new Quaternion(), []);
  const iconPositions = useMemo(
    () => fibonacciSphere(technologies.length, 1.58),
    [],
  );

  const getTrackballPoint = (event: ThreeEvent<PointerEvent>) => {
    const rect = (event.nativeEvent.target as HTMLCanvasElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    const lengthSquared = x * x + y * y;

    if (lengthSquared <= 1) {
      return new Vector3(x, y, Math.sqrt(1 - lengthSquared)).normalize();
    }

    return new Vector3(x, y, 0).normalize();
  };

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    isDraggingRef.current = true;
    previousTrackballPointRef.current = getTrackballPoint(event);
    momentumRef.current.identity();
    (event.nativeEvent.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDraggingRef.current || !groupRef.current || !previousTrackballPointRef.current) {
      return;
    }

    const currentTrackballPoint = getTrackballPoint(event);
    dragRotation.setFromUnitVectors(previousTrackballPointRef.current, currentTrackballPoint);

    groupRef.current.quaternion.premultiply(dragRotation);
    momentumRef.current.copy(dragRotation);
    previousTrackballPointRef.current = currentTrackballPoint;
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    isDraggingRef.current = false;
    previousTrackballPointRef.current = null;
    (event.nativeEvent.target as HTMLElement).releasePointerCapture(event.pointerId);
  };

  useFrame(() => {
    if (!groupRef.current) return;

    if (!isDraggingRef.current) {
      groupRef.current.rotation.y += 0.001;

      if (Math.abs(momentumRef.current.w) < 0.9999) {
        groupRef.current.quaternion.premultiply(momentumRef.current);
        momentumRef.current.slerp(identityRotation, 0.08);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          isDraggingRef.current = false;
          previousTrackballPointRef.current = null;
        }}
      >
        <sphereGeometry args={[2.8, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <ConstellationSphere />

      {technologies.map((tech, index) => (
        <SkillMarker key={tech.name} tech={tech} position={iconPositions[index]} />
      ))}
    </group>
  );
}

export default function SkillsGlobe() {
  return (
    <div className="skills-globe">
      <Canvas
        camera={{ position: [0, 0, 7.1], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Stars radius={70} depth={36} count={620} factor={2.2} fade speed={0.2} />
        <ambientLight intensity={1} />
        <GlobeGroup />
      </Canvas>
    </div>
  );
}
