interface CreateTopicFormExercisesProps {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

export function CreateTopicFormExercises({
  children,
  className,
}: CreateTopicFormExercisesProps) {
  return (
    <section className={className}>
      <h3 className="text-xl font-bold mb-6">Create Topic Exercises</h3>
      {children}
    </section>
  )
}
