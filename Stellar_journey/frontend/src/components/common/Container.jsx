export default function Container({ children }) {
  return (
    <div className="mx-auto max-w-[1380px] px-6 lg:px-8">
      {children}
    </div>
  );
}