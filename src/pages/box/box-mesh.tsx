import React, { FunctionComponent } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { hex_white } from "../../colors";

type Props = {
  position: THREE.Vector3;
  size: number;
};

const BoxMesh: FunctionComponent<Props> = ({ position, size }) => {
  const ref = React.useRef<THREE.Mesh>();
  useFrame(() => {
    const { current: mesh } = ref;
    mesh!.rotation.x = mesh!.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref} position={position}>
      <boxBufferGeometry attach="geometry" args={[size, size, size]} />
      <meshStandardMaterial color={hex_white} attach="material" />
    </mesh>
  );
};

export default BoxMesh;
