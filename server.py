from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os

PORT = int(os.environ.get("PORT", "3000"))
HOST = "0.0.0.0"

class StaticHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json; charset=utf-8",
    }

    def end_headers(self):
        path = self.path.split("?", 1)[0].lower()
        if path in ("", "/") or path.endswith((".html", ".json", ".xml", ".txt")):
            cache_control = "no-cache"
        elif path.startswith(("/assets/", "/images/")):
            cache_control = "public, max-age=604800"
        else:
            cache_control = "public, max-age=86400"
        self.send_header("Cache-Control", cache_control)
        super().end_headers()

    def log_message(self, fmt, *args):
        print("[static] " + (fmt % args), flush=True)

if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), StaticHandler)
    print(f"Aurelia Floral static server listening on http://{HOST}:{PORT}", flush=True)
    server.serve_forever()
