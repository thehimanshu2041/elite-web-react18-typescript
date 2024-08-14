// Define the type for the breakpoints values
interface BreakpointsValues {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

// Define the type for the breakpoints object
interface Breakpoints {
    values: BreakpointsValues;
}

// Create the breakpoints object with the defined type
const breakpoints: Breakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 900, // OLD 960
        lg: 1200, // OLD 1280
        xl: 1536 // OLD 1920
    }
};

export default breakpoints;
