export default function AppFooter() {
  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
