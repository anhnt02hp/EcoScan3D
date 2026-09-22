// ==========================================
// 1. HIỆU ỨNG TẠO POINT CLOUD NỀN HERO SECTION
// ==========================================
function initHeroCanvas() {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 400;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Tạo các điểm dữ liệu Point Cloud giả lập
  const particleCount = 2000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 800;
    positions[i + 1] = (Math.random() - 0.5) * 800;
    positions[i + 2] = (Math.random() - 0.5) * 800;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x10b981,
    size: 2.5,
    transparent: true,
    opacity: 0.6
  });

  const pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    pointCloud.rotation.y += 0.001;
    pointCloud.rotation.x += 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  // Xử lý khi thay đổi kích thước màn hình
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// ==========================================
// 2. BỘ XEM MÔ HÌNH 3D INTERACTIVE (DEMO VIEWER)
// ==========================================
function init3DViewer() {
  const container = document.getElementById('demo-3d-canvas');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050811);

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 10);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Ánh sáng
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x06b6d4, 1);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  // Dựng mô hình kiến trúc di tích 3D demo (dùng Khối kết hợp)
  const group = new THREE.Group();

  // Đế di tích
  const baseGeo = new THREE.CylinderGeometry(3, 3.5, 0.8, 8);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x374151, wireframe: false });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  group.add(baseMesh);

  // Cột di tích
  const templeGeo = new THREE.ConeGeometry(2, 3, 6);
  const templeMat = new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe: false });
  const templeMesh = new THREE.Mesh(templeGeo, templeMat);
  templeMesh.position.y = 1.9;
  group.add(templeMesh);

  scene.add(group);
  camera.lookAt(group.position);

  let isRotating = true;

  function animateViewer() {
    requestAnimationFrame(animateViewer);
    if (isRotating) {
      group.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  }
  animateViewer();

  // Điều khiển nút Bật/Tắt Wireframe
  const wireframeBtn = document.getElementById('btn-toggle-wireframe');
  wireframeBtn.addEventListener('click', () => {
    baseMat.wireframe = !baseMat.wireframe;
    templeMat.wireframe = !templeMat.wireframe;
  });

  // Điều khiển Tạm dừng/Xoay
  const rotateBtn = document.getElementById('btn-rotate');
  rotateBtn.addEventListener('click', () => {
    isRotating = !isRotating;
  });
}

// Chạy hàm khi trang web đã nạp xong
document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  init3DViewer();
});