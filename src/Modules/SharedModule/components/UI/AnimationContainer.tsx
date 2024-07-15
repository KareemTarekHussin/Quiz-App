import { motion } from 'framer-motion';
interface IProps {
  children: React.ReactNode
}
export const opacityAnimation = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '100%' }
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