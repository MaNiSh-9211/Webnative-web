import MainLayout from "@/layouts/main-layout";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="relative z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl font-display font-bold mb-8 text-center"
          >
            About <span className="highlight-text">WebNative</span>
          </motion.h1>

          <div className="glass-card rounded-xl p-8 mb-16">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-display font-bold mb-4"
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-white/70 mb-8"
            >
              WebNative was born from a simple yet powerful idea: to break down the barriers between web applications and native desktop capabilities. We believe that web developers should have access to the same powerful tools and features that native app developers do, without compromising on security or user experience.
            </motion.p>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-2xl font-display font-bold mb-4"
            >
              The Problem We're Solving
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg text-white/70 mb-8"
            >
              Traditional web applications face significant limitations. They can't directly access files on a user's device, run local commands, or interact with the operating system in meaningful ways. This forces developers to create separate desktop applications using frameworks like Electron when they need these capabilities, leading to code duplication and maintenance challenges.
            </motion.p>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-2xl font-display font-bold mb-4"
            >
              Our Solution
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-lg text-white/70"
            >
              WebNative provides a secure bridge between web applications and the local system. By running as a lightweight background service and exposing a simple REST API on localhost, WebNative allows any website to access files, execute commands, and utilize native capabilities—all with explicit user permission and control. This empowers developers to create more powerful web applications without sacrificing security or requiring users to install stand-alone desktop apps.
            </motion.p>
          </div>

          <div className="glass-card rounded-xl p-8">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-2xl font-display font-bold mb-4"
            >
              Our Team
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="text-lg text-white/70 mb-8"
            >
              WebNative was developed by a passionate team of developers who believe in the power of the web platform. With backgrounds in web development, desktop application development, and security, our team is uniquely positioned to create a bridge between these worlds.
            </motion.p>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="text-2xl font-display font-bold mb-4"
            >
              Open Source
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-lg text-white/70"
            >
              WebNative is proudly open source. We believe in transparency, community contribution, and the collective improvement of technology. By making WebNative open source, we ensure that it remains secure, constantly improving, and aligned with the needs of developers and users alike.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
