import { SVGProps } from "react";

const AboutIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 35"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      {...props}
      width="1.2em"
    >
      <path
        d="M6.40527 34.30973c-2.89368-.03456-1.3917-2.10918 1.16675-1.70416 1.61461-.00368 4.29823-.00125 5.91285-.00196V21.52196C9.44026 16.64292.43938 14.87369 1.35103 6.88483c9.1545-.03398 18.30908-.03394 27.46358 0 1.76182 5.97215-7.9438 9.8063-11.9157 14.70946v11.00932c2.38401.02126 4.96646-.15498 7.34697-.01672 1.87429.50349.92964 2.12405-.89189 1.79955-5.6494-.01966-11.30059.0358-16.94872-.07671Z"
        fill="none"
      />
      <path
        d="M4.246659 8.480064c-2.978818-4.653279 3.861584-7.387506 6.118743-3.693753s-3.505354 8.131988 1.698766 11.045934"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="6"
      />
      <circle
        transform="translate(13.891037 17.076313) scale(1.35065)"
        r=".5"
      />
    </svg>
  );
};

export default AboutIcon;
