<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";

const n = 19;
const rots = [
  { ry: 270, a: 0.5 },
  { ry: 0, a: 0.85 },
  { ry: 90, a: 0.4 },
  { ry: 180, a: 0.0 },
];
const tray = ref(null);
const dies = [];
for (let i = 0; i < n; i++) {
  dies.push({
    hue: (i / n) * 75 + 130,
    faces: [
      { text: "ВРЕМЯ", brightness: rots[3].a },
      { text: "ТВОРИТЬ", brightness: rots[0].a },
      { text: "МУЗЫКУ", brightness: rots[1].a },
    ],
  });
}

const timelines = [];

const animateDies = () => {
  dies.forEach((_, i) => {
    const cube = tray.value.children[i]?.querySelector(".cube");
    if (!cube) return;

    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "power3.inOut", duration: 1 },
    });

    timeline
      .fromTo(
        cube,
        { rotateY: -90 },
        { rotateY: 90, ease: "power1.inOut", duration: 2 }
      )
      .fromTo(
        cube.querySelectorAll(".face"),
        {
          color: (j) =>
            `hsl(${dies[i].hue}, 67%, ${
              100 * [rots[3].a, rots[0].a, rots[1].a][j]
            }%)`,
        },
        {
          color: (j) =>
            `hsl(${dies[i].hue}, 67%, ${
              100 * [rots[0].a, rots[1].a, rots[2].a][j]
            }%)`,
        },
        0
      )
      .to(
        cube.querySelectorAll(".face"),
        {
          color: (j) =>
            `hsl(${dies[i].hue}, 67%, ${
              100 * [rots[1].a, rots[2].a, rots[3].a][j]
            }%)`,
        },
        1
      )
      .progress(i / n);

    timelines.push(timeline);
  });

  const containerTimeline = gsap
    .timeline()
    .from(
      tray.value,
      {
        yPercent: -3,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      },
      0
    )
    .fromTo(
      tray.value,
      { rotate: -15 },
      { rotate: 15, duration: 4, ease: "power1.inOut", yoyo: true, repeat: -1 },
      0
    )
    .from(
      tray.value.children,
      {
        duration: 0.01,
        opacity: 0,
        stagger: { each: -0.05, ease: "power1.in" },
      },
      0
    )
    .to(
      tray.value,
      { scale: 1.2, duration: 2, ease: "power3.inOut", yoyo: true, repeat: -1 },
      0
    );

  timelines.push(containerTimeline);
};

const handleResize = () => {
  const h = n * 56;
  gsap.set(tray.value, { height: h });
  gsap.set(tray.value.parentElement, { scale: window.innerHeight / h });
};

const toggleAnimation = (isVisible) => {
  timelines.forEach((timeline) => {
    if (isVisible) {
      timeline.play();
    } else {
      timeline.pause();
    }
  });
};

let observer = null;

onMounted(() => {
  nextTick(() => {
    if (tray.value) {
      animateDies();
      handleResize();

      observer = new IntersectionObserver(
        ([entry]) => {
          const visibilityPercentage = entry.intersectionRatio * 100;
          toggleAnimation(visibilityPercentage >= 15);
        },
        { threshold: [0, 0.15] }
      );

      observer.observe(tray.value);
    } else {
      console.error("Element 'tray' is not defined!");
    }

    window.addEventListener("resize", handleResize);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);

  if (observer && tray.value) {
    observer.unobserve(tray.value);
    observer.disconnect();
  }

  timelines.forEach((timeline) => timeline.kill());
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div ref="tray" class="flex flex-col items-center justify-start">
      <div
        v-for="(item, index) in dies"
        :key="index"
        class="die relative w-[400px] h-[55px] pb-[9px] perspective"
      >
        <div class="cube absolute w-full h-full transform-style-preserve-3d">
          <div
            v-for="(face, faceIndex) in item.faces"
            :key="faceIndex"
            class="face absolute inset-0 flex items-center justify-center text-eph-white text-[50px] font-head font-black"
            :style="{
              color: `hsl(${item.hue}, 67%, ${face.brightness}%)`,
              transform: `rotateY(${rots[faceIndex].ry}deg) translateZ(200px)`,
            }"
          >
            {{ face.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.perspective {
  perspective: 999px;
}
</style>
