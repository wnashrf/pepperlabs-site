#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit
import argparse
import os


class SPARequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, directory=None, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    def resolve_path(self):
        root = os.path.abspath(self.directory)
        parsed = urlsplit(self.path)
        requested_path = parsed.path

        if requested_path in ('', '/'):
            return os.path.join(root, 'index.html')

        if requested_path.endswith('/'):
            directory_path = os.path.join(root, requested_path.lstrip('/'))
            if os.path.isdir(directory_path):
                index_file = os.path.join(directory_path, 'index.html')
                if os.path.isfile(index_file):
                    return index_file

        file_path = os.path.join(root, requested_path.lstrip('/'))
        if os.path.isfile(file_path):
            return file_path

        if os.path.exists(file_path):
            return file_path

        if requested_path.startswith('/assets/') or requested_path.startswith('/css/') or requested_path.startswith('/js/') or requested_path.startswith('/partials/') or requested_path.startswith('/images/') or requested_path.startswith('/scripts/') or requested_path.startswith('/blog/') or requested_path.startswith('/favicon') or requested_path.startswith('/manifest'):
            return file_path

        return os.path.join(root, 'index.html')

    def _serve_file(self, file_path, include_body=True):
        try:
            with open(file_path, 'rb') as file:
                content = file.read()
            self.send_response(200)
            self.send_header('Content-Type', self.guess_type(file_path))
            self.send_header('Content-Length', str(len(content)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            if include_body:
                self.wfile.write(content)
            return True
        except FileNotFoundError:
            return False

    def do_GET(self):
        file_path = self.resolve_path()
        if file_path.endswith('index.html') and os.path.isfile(file_path):
            self._serve_file(file_path, include_body=True)
            return

        if os.path.isdir(file_path):
            self.send_response(301)
            self.send_header('Location', self.path.rstrip('/') + '/')
            self.end_headers()
            return

        return super().do_GET()

    def do_HEAD(self):
        file_path = self.resolve_path()
        if file_path.endswith('index.html') and os.path.isfile(file_path):
            self._serve_file(file_path, include_body=False)
            return

        if os.path.isdir(file_path):
            self.send_response(301)
            self.send_header('Location', self.path.rstrip('/') + '/')
            self.end_headers()
            return

        return super().do_HEAD()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


def run(server_class=ThreadingHTTPServer, handler_class=SPARequestHandler, port=8000, directory='.'):
    server_address = ('0.0.0.0', port)
    httpd = server_class(server_address, lambda *args, **kwargs: handler_class(*args, directory=directory, **kwargs))
    print(f'Serving {directory} on http://localhost:{port}')
    httpd.serve_forever()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Serve a static site with SPA fallback routing.')
    parser.add_argument('directory', nargs='?', default='.', help='Directory to serve')
    parser.add_argument('-p', '--port', type=int, default=8000, help='Port to bind to')
    args = parser.parse_args()
    run(port=args.port, directory=args.directory)
