# worker.py
import sys, json
prompt = sys.argv[1] if len(sys.argv) > 1 else ""
print(f"Python got: {prompt}")
# ...do your real work here: call FastAPI services, run tools, etc...
