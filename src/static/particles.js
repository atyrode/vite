import { tsParticles } from 'https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.3.0/+esm';
import { loadPolygonMaskPlugin } from 'https://cdn.jsdelivr.net/npm/@tsparticles/plugin-polygon-mask@3.3.0/+esm';
import { loadFull } from 'https://cdn.jsdelivr.net/npm/tsparticles@3.3.0/+esm';

let first_time = true;
const field = document.getElementById('field');
field.addEventListener('keypress', showResult);

async function displayBackground() {
    let new_config = await (await fetch("static/background.json")).json()

    await tsParticles
    .load({
      id: "tsparticles2",
      options: new_config,
    });
}

displayBackground();

async function displayTitle() {
    const config = await (await fetch("static/title.json")).json();

    await loadFull(tsParticles);
    await loadPolygonMaskPlugin(tsParticles)

    await tsParticles
    .load({
      id: "tsparticles",
      options: config,
    });
}

displayTitle();


async function resultSlide(uid) {
    let snipResult = document.getElementById('snip_result');

    function resetTransform() {
        if (!first_time) {
            this.style.transform = "translateY(0)";
        }
    }

    if (!first_time) {
        snipResult.classList.remove('slide');
        void snipResult.offsetWidth;
    } else {
        first_time = false;
    }

    snipResult.addEventListener('animationend', resetTransform, {once: true})
    snipResult.classList.add('slide');

    snipResult.addEventListener('click', function() {
        window.location.href = `/${uid}`});
    
    let url = uid.substring(7);
    snipResult.innerHTML = url;
}

async function showResult(ev) {
    const field = document.getElementById('field');
    
    if (ev.key === "Enter") {
        let input = field.value;
        let endpoint = `/encode?url=${input}`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
            });
            const data = await response.json();
            await resultSlide(data.url);

        } catch (error) {
            console.error('Error:', error);
        }
    }
};