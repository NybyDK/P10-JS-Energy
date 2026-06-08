# Evaulating JavaScript Code Patterns
Measuring and evaluating the energy efficiency of 68 JavaScript code patterns across 7 JavaScript engines

# Just here for data?
[Samples CSV](samples.csv)

# Just here for figures?
[Figures folder](figures)\
[Graphs folder](graphs)

# Just here for benchmark files?
[Templates folder](templates)

# Prerequisites
- Linux system with RAPL
- Installed JavaScript engines (I recommend [JSVU](https://github.com/GoogleChromeLabs/jsvu))
  - V8, SpiderMonkey, JavaScriptCore, GraalJS, Hermes, QuickJS, and Moddable XS
- Templates folder with benchmarks (already supplied)

# Execute script
If the bash script does not already have permission:\
`chmod +x benchmark.sh`

Then:\
`./benchmark.sh`

If you want to run this while disconnected from SSH, I recommend [tmux](https://github.com/tmux/tmux/wiki), start a session, start a script, detach from the session, and you can come back and reattach any time

# Analysis
The analysis scripts are provided as-is with no promises\
Run with `python file.py` (assuming you changed directory to analysis folder) and install missing packages with pip\
Some files require the output of other files. When in doubt, run `python eslint.py` first.
