import { useRef } from "react";
import "./App.css";
import {
  Canvas,
  MeshPhysicalMaterialProps,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";

function Shape({
  position = [0, 0, 0],
  color = "lime",
}: {
  position?: [number, number, number];
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = pointer.y * 2;
      meshRef.current.rotation.y = pointer.x * 2;
    }
  });

  const materialParams: MeshPhysicalMaterialProps = {
    color,
    transmission: 1,
    roughness: 0.05,
    metalness: 0,
    thickness: 0.2,
    iridescence: 1,
  };

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry />
      <meshPhysicalMaterial {...materialParams} />
    </mesh>
  );
}

function Background() {
  const bg = useLoader(TextureLoader, "champloo.jpg");

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[16, 9]} />
      <meshBasicMaterial map={bg} />
    </mesh>
  );
}

function Light({
  position = [0, 0, 5],
}: {
  position?: [number, number, number];
}) {
  const lightRef = useRef<THREE.PointLight>(null!);
  return <pointLight position={position} intensity={5} ref={lightRef} />;
}

function App() {
  return (
    <>
      <Canvas shadows={true} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <Background />
        <Light />
        <Shape position={[0, 0, 1]} />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
