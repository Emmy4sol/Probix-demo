document.addEventListener("mousemove", (e) => {
  const layers = document.querySelectorAll(".parallax-layer");
  
  // Calculate cursor distance relative to the center of the viewport
  const mouseX = e.clientX - window.innerWidth / 2;
  const mouseY = e.clientY - window.innerHeight / 2;

  layers.forEach((layer) => {
    // Read individual speed variable assignment from HTML attributes
    const speed = layer.getAttribute("data-speed");
    
    // Smooth translation equations
    const x = (mouseX * speed) / 100;
    const y = (mouseY * speed) / 100;

    // Apply the offset positioning to each separate depth plane
    layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});
