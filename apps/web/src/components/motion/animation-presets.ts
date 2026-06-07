import { motionTokens } from "@/lib/constants";

export const fadeUp = {
  hidden: { opacity: 0, y: motionTokens.distance.medium },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.easing.emphasized
    }
  }
};

export const slideIn = {
  hidden: { opacity: 0, x: motionTokens.distance.medium },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.easing.standard
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.easing.emphasized
    }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionTokens.stagger.normal
    }
  }
};

export const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      duration: motionTokens.duration.slow,
      ease: motionTokens.easing.emphasized
    }
  }
};
