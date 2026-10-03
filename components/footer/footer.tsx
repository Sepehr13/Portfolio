export default function Footer() {
  return (
    <footer className="relative flex flex-col items-center justify-center w-full h-16 border-t border-border">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Sepehr Azizi. All rights reserved.
      </p>
    </footer>
  );
}