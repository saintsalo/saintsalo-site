"use client"
import { PostBySlugQuery } from "@/graphql/generated/graphql"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
interface ExpandContentProps {
  post: PostBySlugQuery["post"]
}

const ExpandContent: React.FC<ExpandContentProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  if (!post) return null
  return (
    <div className="flex flex-col transition-all duration-300">
      <div
        className="hover:cursor-pointer hover:underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        EXPAND
      </div>

      <div className="mt-4 grow">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key={post.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="transition-all ease-in-out"
            >
              <div>
                <h2 className="text-xl font-bold">{post.name}</h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ExpandContent
