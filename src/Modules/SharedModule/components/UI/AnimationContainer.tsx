import { motion } from 'framer-motion';
interface IProps {
  children: React.ReactNode
}
export const opacityAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }
const AnimationContainer = ({ children }: IProps) => {
  return <>
    <motion.div
      variants={opacityAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ ease: "easeInOut", duration: 0.5 }} >
      {children}
    </motion.div>
  </>
}

export default AnimationContainer