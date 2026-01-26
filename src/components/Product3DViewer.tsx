"use client";

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, PerspectiveCamera, Environment, ContactShadows, Html, Loader } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
    url: string;
    color?: string;
    autoRotate?: boolean;
}

const Model = ({ url, color, autoRotate }: ModelProps) => {
    const { scene } = useGLTF(url, true); // true to use Draco loader if needed

    // Apply color to the material if it's a simple model
    React.useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (color) {
                    // Clone material to avoid affecting other instances if needed
                    child.material = child.material.clone();
                    child.material.color.set(color);
                }
            }
        });
    }, [scene, color]);

    return <primitive object={scene} scale={2.5} />;
};

interface Product3DViewerProps {
    modelPath?: string;
    autoRotate?: boolean;
    color?: string;
    height?: string;
}

// Custom Error Boundary to catch loading failures
class ModelErrorBoundary extends React.Component<{ children: React.ReactNode, onCatch: () => void }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch() {
        this.props.onCatch();
    }
    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

const Product3DViewer = ({
    modelPath = "/assets/models/shirt.glb",
    autoRotate = true,
    color,
    height = "h-[400px] lg:h-[600px]"
}: Product3DViewerProps) => {
    const [loadError, setLoadError] = useState<boolean>(false);

    return (
        <div className={`relative w-full ${height} bg-gradient-to-b from-white to-neutral-50 rounded-2xl overflow-hidden`}>
            {loadError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-neutral-50">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Experience Preview</h3>
                    <p className="text-xs text-neutral-500 max-w-[250px] leading-relaxed">
                        We're currently optimizing the 3D model. In the meantime, please view the high-resolution gallery below.
                    </p>
                </div>
            ) : (
                <Suspense fallback={
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs uppercase tracking-widest font-medium">Loading 3D Experience...</p>
                    </div>
                }>
                    <Canvas
                        shadows
                        dpr={[1, 2]}
                        onError={() => setLoadError(true)}
                    >
                        <ModelErrorBoundary onCatch={() => setLoadError(true)}>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

                            <Stage environment="city" intensity={0.5} shadows adjustCamera={false}>
                                <Model url={modelPath} color={color} />
                            </Stage>

                            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
                                <planeGeometry args={[10, 10]} />
                                <shadowMaterial transparent opacity={0.2} />
                            </mesh>

                            <ContactShadows
                                position={[0, -1.5, 0]}
                                opacity={0.4}
                                scale={10}
                                blur={2.5}
                                far={4}
                            />

                            <OrbitControls
                                enablePan={false}
                                enableZoom={true}
                                minDistance={3}
                                maxDistance={7}
                                autoRotate={autoRotate}
                                autoRotateSpeed={0.5}
                                makeDefault
                            />
                        </ModelErrorBoundary>
                    </Canvas>
                </Suspense>
            )}

            {!loadError && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 pointer-events-none transition-opacity duration-500 hover:opacity-0 lg:flex">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/60 flex items-center">
                        <span className="w-1 h-1 bg-gold rounded-full mr-2 animate-pulse"></span>
                        Drag to rotate • Scroll to zoom
                    </span>
                </div>
            )}

            {/* Fallback for Loader */}
            <Loader
                containerStyles={{ background: 'transparent' }}
                innerStyles={{ width: '100px', height: '2px', background: '#ccc' }}
                barStyles={{ background: '#000', height: '2px' }}
                dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
            />
        </div>
    );
};

export default Product3DViewer;
