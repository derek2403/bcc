import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    mountRef.current.appendChild(renderer.domElement);

    // Create warp lines as moving streaks
    const lines = [];
    const lineCount = 150;

    for (let i = 0; i < lineCount; i++) {
      // Create line geometry for streaks
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        linewidth: 5
      });

      // Calculate angle for this line
      const angle = (i / lineCount) * Math.PI * 2;
      
      // Initial empty line
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
      ];
      
      geometry.setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      
      // Store line properties
      line.userData = {
        angle: angle,
        speed: 0.12 + Math.random() * 0.08,
        position: Math.random() * 20,
        length: 2 + Math.random() * 3,
        maxDistance: 25
      };
      
      scene.add(line);
      lines.push(line);
    }

    // Add center glow
    const glowGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.8
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Position camera
    camera.position.z = 8;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      lines.forEach((line) => {
        // Move the streak outward
        line.userData.position += line.userData.speed;
        
        // Reset when streak goes too far
        if (line.userData.position > line.userData.maxDistance) {
          line.userData.position = 0;
        }
        
        // Calculate streak start and end positions
        const streakStart = Math.max(0, line.userData.position - line.userData.length);
        const streakEnd = line.userData.position;
        
        // Create the moving streak
        const points = [];
        points.push(new THREE.Vector3(
          Math.cos(line.userData.angle) * streakStart,
          Math.sin(line.userData.angle) * streakStart,
          0
        ));
        points.push(new THREE.Vector3(
          Math.cos(line.userData.angle) * streakEnd,
          Math.sin(line.userData.angle) * streakEnd,
          0
        ));
        
        line.geometry.setFromPoints(points);
        
        // Fade based on distance from center
        const fadeProgress = line.userData.position / line.userData.maxDistance;
        line.material.opacity = 0.9 * (1 - fadeProgress * 0.8);
      });

      // Gentle glow animation
      glow.material.opacity = 0.6 + Math.sin(Date.now() * 0.003) * 0.3;
      glow.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.2);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0"
      style={{ background: 'black' }}
    />
  );
}
