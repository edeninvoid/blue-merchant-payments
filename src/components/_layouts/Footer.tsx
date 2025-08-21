export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="fixed bottom-0 left-0 flex h-11 w-full items-center justify-center gap-4 border-t border-gray-300 bg-white p-4"
    >
      <p className="flex items-center gap-1 text-gray-600">
        <span className="text-xs">© 2025 Blue Payments.</span>
        <small className="text-xs">All rights reserved.</small>
      </p>
    </footer>
  );
}
