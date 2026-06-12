export const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-300 mx-auto lg:px-8 px-4 min-h-screen bg-center bg-no-repeat relative z-10">
    {children}
  </div>
)
