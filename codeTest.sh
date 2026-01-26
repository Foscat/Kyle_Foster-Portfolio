# Arrow functions in JSDoc
grep -R "@param.*=>" src

# Arrow return types
grep -R "=> void" src

# import() types
grep -R "import(\"" src

# Inline object typing
grep -R "{.*:.*}" src | grep "@"
