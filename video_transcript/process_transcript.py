import re
import sys
sys.path.insert(0, "../../python-api")
import nn_client
import json

if sys.version_info <= (3,0):
  print("This program only runs in python3", file=sys.stderr)
  exit(1)

def main():
  english_ipa_fn = nn_client.make_nn_function(8000, "../../ipa-transformers-nn/vector_data/cmu")
  out = {}
  with open("transcript.txt") as f:
    for line in f:
      match = re.match(r"^(\d{2}):(\d{2})(.+)$", line)
      if match:
        timestamp = 60 * int(match.group(1)) + int(match.group(2))
        terms = match.group(3).split()
        new_terms = []
        new_ipa_terms = []
        print(timestamp)
        for term in terms:
          new_terms.append("".join(filter(lambda x: x.isalpha(), term)).upper())
        for term in new_terms:
          locs = None
          if term in out:
            locs = out[term]
          else:
            locs = set()
            out[term] = locs
          locs.add(timestamp)

  with open("transcript_processed.json", "w") as f:
    new_out = {}
    for key, value in out.items():
      if key:
        new_out[key] = list(value)
    json.dump({
      "video_search": new_out
    }, f)

if __name__ == "__main__":
  main()

