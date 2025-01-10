<script setup lang="ts">
import type { Frame } from '~/utils/probe';

const pin1: Ref<SVGElement | null> = ref(null);
const pin2: Ref<SVGElement | null> = ref(null);
const pin3: Ref<SVGElement | null> = ref(null);
const pin4: Ref<SVGElement | null> = ref(null);
const pin5: Ref<SVGElement | null> = ref(null);
const pin6: Ref<SVGElement | null> = ref(null);
const pin7: Ref<SVGElement | null> = ref(null);
const pin8: Ref<SVGElement | null> = ref(null);
const pin9: Ref<SVGElement | null> = ref(null);
const pin10: Ref<SVGElement | null> = ref(null);
const pin11: Ref<SVGElement | null> = ref(null);
const pin12: Ref<SVGElement | null> = ref(null);
const pin13: Ref<SVGElement | null> = ref(null);
const pin14: Ref<SVGElement | null> = ref(null);
const pins_dom = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14];

const props = defineProps<{
  editable: boolean;
  frame: Frame;
}>();

useEventListener(document, 'contextmenu', (e: MouseEvent) => {
  e.preventDefault();
});


pins_dom.forEach((pin_dom, index) => {
  useEventListener(pin_dom, 'mouseover', (e: MouseEvent) => {
    if (props.editable) {
      if (!props.frame.pins[index]) {
        (e.currentTarget as SVGElement).style.fill = "grey";
      }
    }
  });

  useEventListener(pin_dom, 'mouseout', (e: MouseEvent) => {
    if (props.editable) {
      (e.currentTarget as SVGElement).style.fill = props.frame.pins[index] ? "green" : "white";
    }
  });

  useEventListener(pin_dom, 'mousedown', (e: MouseEvent) => {
    if (props.editable) {
      if (e.buttons === 1) {
        props.frame.pins[index] = !props.frame.pins[index];
      } else if (e.buttons === 2) {
        props.frame.ios[index] = !props.frame.ios[index];
      }
    }
  });
});

watchEffect(() => {
  props.frame.pins.forEach((value, index) => {
    if (pins_dom[index].value) {
      (pins_dom[index].value as SVGElement).style.fill = value ? "green" : "white";
    }
  });

  props.frame.ios.forEach((value, index) => {
    if (pins_dom[index].value) {
      (pins_dom[index].value as SVGElement).style.stroke = value ? "red" : "darkred";
      (pins_dom[index].value as SVGElement).style.strokeWidth = "2";
    }
  });
})
</script>

<template>
  <svg
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:cc="http://creativecommons.org/ns#"
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
    width="400"
    height="400"
    viewBox="0 0 105.83333 105.83334"
    version="1.1"
    id="svg8">
    <defs
      id="defs2">
      <marker
        inkscape:stockid="Arrow1Lstart"
        orient="auto"
        refY="0"
        refX="0"
        id="Arrow1Lstart"
        style="overflow:visible"
        inkscape:isstock="true">
        <path
          id="path4528"
          d="M 0,0 5,-5 -12.5,0 5,5 Z"
          style="fill-rule:evenodd;stroke:#000000;stroke-width:1.00000003pt"
          transform="matrix(0.8,0,0,0.8,10,0)"
          inkscape:connector-curvature="0" />
      </marker>
    </defs>
    <g
      inkscape:label="Calque 1"
      inkscape:groupmode="layer"
      id="layer1"
      transform="translate(0,-191.16665)">
      <g
        id="g4985"
        transform="matrix(0.82967968,0,0,0.86439462,-13.183749,32.065422)">
        <rect
          style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
          y="220.08183"
          x="26.64732"
          height="48.191963"
          width="107.15625"
          id="rect3721" />
        <g
          transform="translate(0.04343538,-0.40088812)"
          id="g4966"
          style="fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-opacity:1">
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 27.901914,204.52833 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 60.161088,204.52833 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-0"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 76.263218,204.52833 h 7.105509 v 10.69628 h -7.105509 z"
            id="rect3721-2-5-1"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 92.365344,204.52833 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-4"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48532265;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 108.46747,204.52833 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-8"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48532265;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 124.5696,204.52833 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-9"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48532265;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 44.058962,204.52833 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-0-1"
            inkscape:connector-curvature="0" />
        </g>
        <g
          transform="translate(0.21308738,-0.40090429)"
          id="g4957"
          style="fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-opacity:1">
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 27.787184,273.87842 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 59.991434,273.87842 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-0-7"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 76.093564,273.87842 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-1-3"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 92.195684,273.87842 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-4-8"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 108.29782,273.87842 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-8-3"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 124.39995,273.87842 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-9-3"
            inkscape:connector-curvature="0" />
          <path
            style="opacity:1;fill:#000b58;fill-opacity:1;stroke:#000b58;stroke-width:0.48526391;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
            d="m 43.889304,273.87842 h 7.10551 v 10.69628 h -7.10551 z"
            id="rect3721-2-5-0-1-5"
            inkscape:connector-curvature="0" />
        </g>
      </g>
      <g
        id="g5092"
        transform="matrix(1.184471,0,0,1.184471,-41.409613,-40.145672)">
        <circle
          r="3.3342636"
          cy="202.40646"
          cx="45.759594"
          ref="pin14"
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" />
        <circle
          r="3.3342636"
          cy="202.40646"
          cx="57.08828"
          ref="pin13"
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" />
        <circle
          r="3.3342636"
          cy="202.40646"
          cx="68.416969"
          ref="pin12"
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" />
        <circle
          r="3.3342636"
          cy="202.40646"
          cx="79.745651"
          ref="pin11"
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" />
        <circle
          r="3.3342636"
          cy="202.40646"
          cx="91.074333"
          ref="pin10"
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" />
        <circle
          r="3.3342636"
          cy="202.40646"
          cx="102.40303"
          ref="pin9"
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" />
        <circle
          r="3.3342636"
          cy="202.40646"
          cx="113.73169"
          ref="pin8"
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke" />
      </g>
      <g
        id="g5108"
        transform="matrix(1.184471,0,0,1.184471,-41.5679,48.969618)">
        <circle
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
          ref="pin1"
          cx="45.759594"
          cy="201.7383"
          r="3.3342636"
          inkscape:label="#pin1" />
        <circle
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
          ref="pin2"
          cx="57.08828"
          cy="201.7383"
          r="3.3342636" />
        <circle
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
          ref="pin3"
          cx="68.416969"
          cy="201.7383"
          r="3.3342636"
          inkscape:label="#pin3" />
        <circle
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
          ref="pin4"
          cx="79.745651"
          cy="201.7383"
          r="3.3342636" />
        <circle
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
          ref="pin5"
          cx="91.074333"
          cy="201.7383"
          r="3.3342636" />
        <circle
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
          ref="pin6"
          cx="102.40303"
          cy="201.7383"
          r="3.3342636" />
        <circle
          style="opacity:1;fill:none;stroke:#000000;stroke-width:0.33147287;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
          ref="pin7"
          cx="113.73169"
          cy="201.7383"
          r="3.3342636" />
        <circle
          style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:0.18207286;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
          id="circle5094-6"
          cx="46.15065"
          cy="177.69873"
          r="1.8295648" />
      </g>
      <path
        style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:0.25939023;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
        d="m 13.724679,241.6151 a 5.8703046,5.8703051 0 0 1 -5.8703042,5.87031 5.8703046,5.8703051 0 0 1 -5.8703046,-5.87031 5.8703046,5.8703051 0 0 1 5.8703046,-5.8703 5.8703046,5.8703051 0 0 1 5.8703042,5.8703 z"
        id="path5127"
        inkscape:connector-curvature="0" />
    </g>
  </svg>
</template>