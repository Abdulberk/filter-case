

import { animated, useSpring } from "@react-spring/web";


interface Props extends React.SVGProps<SVGSVGElement> {
  checked: boolean;

}

const Check = ({ checked, ...props }: Props) => {
    const checkPath = "M6 11.6667L9.66667 15.3333L16.3333 8.66667";


    const springProps = useSpring({
      strokeDashoffset: checked ? 0 : 24,
      opacity: checked ? 1 : 0,
      config: { duration: 200 },
        fill: checked ? "#4169E1" : "transparent",

    });
  
    return ( 
      <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 22 22"
        fill="none"
        {...props}
      >
        <animated.rect
          x={0.5}
          y={0.5}
          width={21}
          height={21}
          rx={10.5}
          fill= {springProps.fill}
          stroke="#4169E1"
        />
        <animated.path
          fillRule="evenodd"
          clipRule="evenodd"
          d={checkPath}
          strokeDasharray="24"
          strokeDashoffset={springProps.strokeDashoffset}
          opacity={springProps.opacity}
          fill="transparent"
          stroke="white"
          strokeWidth={2}
        />
      </animated.svg>
    );
  };
  
  export default Check;