module.exports = (file, api, opts) => {
  const j = api.jscodeshift;
  const module = opts.module;

  const matchesUserFilter = importDeclaration =>
    module && importDeclaration.source.value === module;

  return j(file.source)
    .find(j.ImportDeclaration)
    .filter(path => matchesUserFilter(path.value))
    .forEach(path => {
      const importDeclaration = path.value;
      const modules = importDeclaration.specifiers.filter(
        n => n.type === "ImportSpecifier"
      );
      modules.forEach(i => {
        const name = i.local.name;
        const file = `${importDeclaration.source.value}/${name}`;
        j(path).insertAfter(
          j.importDeclaration(
            [j.importDefaultSpecifier(j.identifier(name))],
            j.literal(file)
          )
        );
      });
      importDeclaration.specifiers = importDeclaration.specifiers.filter(
        n => n.type !== "ImportSpecifier"
      );

      if (importDeclaration.specifiers.length === 0)
        j(path).remove(importDeclaration);
    })
    .toSource();
};
