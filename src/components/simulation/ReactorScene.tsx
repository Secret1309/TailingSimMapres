import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html, useProgress, PerspectiveCamera, Environment, Sky } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useSimulationStore } from "@/lib/store";

// --- Helpers ---

const getTempColor = (t: number) => {
    if (t <= 25) return "#9ca3af"; // Grey (Room temp)
    if (t <= 50) return "#d97706"; // Amber (Moderate heat)
    return "#dc2626"; // Red (High heat)
};

// --- Components ---

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center zIndexRange={[100, 0]}>
            <div className="flex w-64 flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
                <div className="mb-2 text-sm font-bold text-white">Loading TAILINGSIM 3D...</div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                    <motion.div
                        className="h-full bg-gray-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
                <div className="mt-1 text-xs text-gray-300">{progress.toFixed(0)}%</div>
            </div>
        </Html>
    );
}

function PipePath({ points, radius = 0.06, color = "#6b7280" }: { points: number[][], radius?: number, color?: string }) {
    const curve = useMemo(() => {
        const vectors = points.map(p => new THREE.Vector3(...p));
        return new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0.1);
    }, [points]);

    return (
        <mesh>
            <tubeGeometry args={[curve, 64, radius, 8, false]} />
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>
    );
}

function DataLabel({ position, title, data }: { position: [number, number, number], title: string, data?: string[] }) {
    return (
        <Html position={position} center distanceFactor={15} zIndexRange={[100, 0]}>
            <div className="pointer-events-none select-none flex flex-col items-start rounded-lg border border-gray-500/30 bg-gray-900/70 p-2 shadow-lg backdrop-blur-sm min-w-[120px]">
                <div className="mb-1 text-[10px] font-bold text-white/90 uppercase tracking-wider border-b border-gray-500/30 w-full pb-1">{title}</div>
                {data && data.map((line, idx) => (
                    <div key={idx} className="font-mono text-[9px] text-gray-300 whitespace-nowrap mt-0.5">
                        {line}
                    </div>
                ))}
            </div>
        </Html>
    );
}

// 1. Tailing Silo - Large Cylinder
function TailingSilo() {
    const mass = useSimulationStore(state => state.inputMass);
    return (
        <group>
            {/* Main Silo Body (Cylinder) */}
            <mesh position={[-5, 2.0, 0]}>
                <cylinderGeometry args={[1.0, 1.0, 4.0, 32]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.25} />
            </mesh>
            {/* Cone Top (Hopper) */}
            <mesh position={[-5, 4.4, 0]}>
                <coneGeometry args={[1.0, 0.8, 32]} />
                <meshStandardMaterial color="#64748b" metalness={0.6} />
            </mesh>
            {/* Cone Bottom (Discharge) */}
            <mesh position={[-5, -0.4, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[1.0, 0.8, 32]} />
                <meshStandardMaterial color="#64748b" metalness={0.6} />
            </mesh>

            <DataLabel position={[-5, 6.5, 0]} title="TAILING SILO" data={[`Kapasitas: ${mass} ton/hari`]} />
        </group>
    );
}

// 2. Geopolymer Mixer & Molding Machine - Box/Cube
function MixerMolder() {
    const binderRatio = useSimulationStore(state => state.binderRatio);
    return (
        <group>
            {/* Main Machine Body (Box) */}
            <mesh position={[0, 1.25, 0]}>
                <boxGeometry args={[2.5, 2.5, 2.0]} />
                <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.2} />
            </mesh>
            {/* Motor/Drive on Top */}
            <mesh position={[0, 2.8, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.4, 0.4, 1.2, 16]} />
                <meshStandardMaterial color="#1f2937" metalness={0.8} />
            </mesh>
            {/* Hopper/Funnel on top */}
            <mesh position={[0, 3.0, 0.6]}>
                <coneGeometry args={[0.5, 0.6, 4]} />
                <meshStandardMaterial color="#6b7280" metalness={0.5} />
            </mesh>

            <DataLabel
                position={[0, 5.5, 0]}
                title="MIXER & MOLDER"
                data={[
                    `Binder Ratio: ${binderRatio}%`,
                    "Geopolymer Mixing",
                    "Hydraulic Press"
                ]}
            />

            {/* Output Labels */}
            <Html position={[0, 2.8, 1.2]} distanceFactor={10} center>
                <div className="rounded bg-gray-600/80 px-1 py-0.5 text-[8px] font-bold text-white border border-gray-400/30">BINDER IN</div>
            </Html>
        </group>
    );
}

// 3. Curing Chamber - Long Box
function CuringChamber() {
    const curingTemp = useSimulationStore(state => state.curingTemp);
    const chamberColor = getTempColor(curingTemp);

    return (
        <group>
            {/* Main Chamber Body (Long Box) */}
            <mesh position={[5.5, 1.0, 0]}>
                <boxGeometry args={[3.0, 2.0, 2.0]} />
                <meshStandardMaterial
                    color={chamberColor}
                    emissive={chamberColor}
                    emissiveIntensity={curingTemp > 30 ? 0.15 : 0}
                    metalness={0.5}
                    roughness={0.3}
                />
            </mesh>
            {/* Chimney/Vent */}
            <mesh position={[6.5, 2.5, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 1.0, 8]} />
                <meshStandardMaterial color="#4b5563" metalness={0.6} />
            </mesh>
            {/* Door front */}
            <mesh position={[4.0, 1.0, 0.01]}>
                <boxGeometry args={[0.05, 1.6, 1.6]} />
                <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.1} />
            </mesh>

            <DataLabel
                position={[5.5, 4.5, 0]}
                title="CURING CHAMBER"
                data={[
                    `Suhu: ${curingTemp}°C`,
                    curingTemp <= 25 ? "Mode: Ambient" : "Mode: Oven Aktif"
                ]}
            />

            {/* Output Label */}
            <Html position={[7.2, 1.0, 0]} distanceFactor={10} center>
                <div className="rounded bg-gray-800/80 px-1 py-0.5 text-[8px] font-bold text-white border border-gray-400/30">PRODUK ✓</div>
            </Html>
        </group>
    );
}

function PlantModel() {
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef}>
            {/* Machines */}
            <TailingSilo />
            <MixerMolder />
            <CuringChamber />

            {/* PIPING SYSTEM */}

            {/* Pipe 1: Silo discharge -> Conveyor -> Mixer inlet */}
            <PipePath points={[
                [-5.0, -0.8, 0],
                [-5.0, -1.2, 0],
                [-4.5, -1.2, 0],
                [-3.0, -1.2, 0],
                [-1.5, -1.2, 0],
                [-1.25, -0.5, 0],
                [-1.25, 0.5, 0],
            ]} />

            {/* Pipe 2: Mixer outlet -> Curing Chamber inlet */}
            <PipePath points={[
                [1.25, 1.0, 0],
                [1.8, 1.0, 0],
                [2.5, 1.0, 0],
                [3.2, 1.0, 0],
                [4.0, 1.0, 0],
            ]} />

            {/* Conveyor Belt Visual (simple boxes) */}
            <mesh position={[-2.5, 0.1, 0]}>
                <boxGeometry args={[3.0, 0.1, 0.6]} />
                <meshStandardMaterial color="#4b5563" metalness={0.5} />
            </mesh>
            <mesh position={[3.0, 0.1, 0]}>
                <boxGeometry args={[3.0, 0.1, 0.6]} />
                <meshStandardMaterial color="#4b5563" metalness={0.5} />
            </mesh>

            {/* Floor */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[24, 12]} />
                <meshStandardMaterial color="#e5e7eb" />
            </mesh>
            <gridHelper args={[24, 24, 0x9ca3af, 0xe5e7eb]} position={[0, 0.01, 0]} />
        </group>
    );
}

export function ReactorScene() {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
            {/* 3D Canvas */}
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 12], fov: 40 }}>
                <PerspectiveCamera makeDefault position={[0, 6, 18]} />

                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />

                <Sky sunPosition={[100, 20, 100]} inclination={0.6} azimuth={0.1} />
                <Environment preset="city" />

                <React.Suspense fallback={<Loader />}>
                    <PlantModel />
                </React.Suspense>

                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.1}
                    maxDistance={30}
                    minDistance={6}
                />
            </Canvas>

            {/* Legends */}
            <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2 pointer-events-none">
                <div className="rounded-lg bg-white/90 p-3 text-xs shadow-sm backdrop-blur-sm pointer-events-auto border border-gray-300">
                    <div className="mb-2 font-bold text-gray-700">Suhu Curing</div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="block h-2 w-2 rounded-full bg-gray-400"></span>
                        <span>Ambient (≤25°C)</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="block h-2 w-2 rounded-full bg-amber-600"></span>
                        <span>Moderate (26-50°C)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="block h-2 w-2 rounded-full bg-red-600"></span>
                        <span>High (&gt;50°C)</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 rounded-lg bg-white/80 p-2 text-[10px] text-gray-500 backdrop-blur-sm pointer-events-none">
                Left Click: Rotate • Right Click: Pan • Scroll: Zoom
            </div>
        </div>
    );
}
