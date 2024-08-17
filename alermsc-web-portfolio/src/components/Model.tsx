'use client';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import * as THREE from 'three';
import { useRef, useState } from 'react';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/test.glb') as GLTFResult;
  const texture = useLoader(THREE.TextureLoader, '/12.jpg');

  // Asegúrate de que la textura se carga correctamente
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Ajustar la textura para que cubra toda la geometría
  const geometry = nodes.Cube.geometry.clone();

  // Obtén las dimensiones del bounding box de la geometría
  const bbox = new THREE.Box3().setFromObject(nodes.Cube);
  const size = new THREE.Vector3();
  bbox.getSize(size);

  // Calcular la relación de aspecto entre la geometría y la textura
  const geometryAspectRatio = size.x / size.y;
  const textureAspectRatio = texture.image.width / texture.image.height;

  let scaleX = 1;
  let scaleY = 1;

  if (geometryAspectRatio > textureAspectRatio) {
    scaleY = textureAspectRatio / geometryAspectRatio;
  } else {
    scaleX = geometryAspectRatio / textureAspectRatio;
  }

  texture.repeat.set(scaleX, scaleY);
  texture.center.set(0.5, 0.5);
  texture.rotation = 0; // Dejar la rotación en 0 para pruebas

  const glass = useRef<THREE.Mesh>(null);

  const positions = [
    [-6, -4, 0],
    [-5, -3, 0],
    [-4, -2, 0],
    [-3, -1, 0],
    [-2, 0, 0],
    [-1, 1, 0],
    [0, 2, 0],
    [1, 3, 0],
    [2, 4, 0],
  ];

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <group {...props} dispose={null}>
      {positions.map((position, index) => {
        const isHovered = hoverIndex === index;
        const adjustedPosition = isHovered
          ? [position[0] + 0.5, position[1], position[2]]
          : position;

        return (
          <mesh
            key={index}
            name={`Cube-${index}`}
            castShadow
            receiveShadow
            geometry={geometry}
            scale={[1.4, 1.05, 1]}
            rotation={[0.1, -0.2, -0.04]}
            position={
              new THREE.Vector3(adjustedPosition[0], adjustedPosition[1], adjustedPosition[2])
            }
            ref={glass}
            onPointerOver={() => setHoverIndex(index)}
            onPointerOut={() => setHoverIndex(null)}
          >
            <meshStandardMaterial
              attach='material'
              map={texture}
              transparent={true}
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}
