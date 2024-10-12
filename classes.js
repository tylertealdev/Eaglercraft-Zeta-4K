// Set up the scene, camera, and renderer
const canvas = document.getElementById('gameCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);  // Set the initial camera position

// Load your custom texture (32x32 .webp)
const textureLoader = new THREE.TextureLoader();
const blockTexture = textureLoader.load('https://github.com/tylertealdev/Eaglercraft-Zeta-4K/raw/refs/heads/main/jeee_32x32.webp');  // Load the texture file

// Create a block material with the texture
const blockMaterial = new THREE.MeshBasicMaterial({ map: blockTexture });

// Create a function to generate blocks (cubes)
function createBlock(x, y, z) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const block = new THREE.Mesh(geometry, blockMaterial);
    block.position.set(x, y, z);
    return block;
}

// Create a grid of blocks (simple world)
const world = [];
for (let x = -5; x < 5; x++) {
    for (let y = 0; y < 3; y++) {
        for (let z = -5; z < 5; z++) {
            const block = createBlock(x, y, z);
            world.push(block);
            scene.add(block);
        }
    }
}

// Add a basic directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Set up basic camera movement controls
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': moveForward = true; break;
        case 's': moveBackward = true; break;
        case 'a': moveLeft = true; break;
        case 'd': moveRight = true; break;
    }
});
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w': moveForward = false; break;
        case 's': moveBackward = false; break;
        case 'a': moveLeft = false; break;
        case 'd': moveRight = false; break;
    }
});

// Adjust camera aspect ratio on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Basic animation loop to update the camera position and render the scene
function animate() {
    requestAnimationFrame(animate);

    // Movement logic (first-person controls)
    const speed = 0.1;
    if (moveForward) camera.position.z -= speed;
    if (moveBackward) camera.position.z += speed;
    if (moveLeft) camera.position.x -= speed;
    if (moveRight) camera.position.x += speed;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
