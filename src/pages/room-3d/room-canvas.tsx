// @ts-nocheck
import React, { FunctionComponent, Suspense, useRef } from "react";
import { Canvas, Dom, useFrame } from "react-three-fiber";
import Scene from "./room-gltf";

function Rig({ children }) {
  const inner = useRef();
  useFrame(({ clock }) => {
    inner.current.rotation.y = Math.sin(clock.getElapsedTime() / 2) * Math.PI;
  });
  return (
    <group position={[0, -0.6, 0]}>
      <group ref={inner}>{children}</group>
    </group>
  );
}

const Room3DCanvas: FunctionComponent = () => {
  return (
    <Canvas camera={{ position: [5, 5, -10], fov: 30 }}>
      <ambientLight color={0xffffff} castShadow intensity={1.4} />
      <Suspense fallback={<Dom center>loading ...</Dom>}>
        <Rig>
          <Scene />
        </Rig>
      </Suspense>
    </Canvas>
  );
};

export default Room3DCanvas;
