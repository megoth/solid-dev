import { readFileSync, writeFileSync } from 'fs'

export function setLocal (moduleToModify, modulesToSet) {
  const packageJson = JSON.parse(readFileSync(`../${moduleToModify}/package.json`, 'utf-8'))
  manipulateDependency(packageJson, 'dependencies', modulesToSet)
  manipulateDependency(packageJson, 'devDependencies', modulesToSet)
  writeFileSync(`../${moduleToModify}/package.json`, JSON.stringify(packageJson, null, 2) + '\n')
}

function manipulateDependency (packageJson, dependencyType, modulesToSet) {
  const modulesToSetMap = modulesToSet
    .filter(i => Array.isArray(i) ? packageJson[dependencyType][i[0]] : packageJson[dependencyType][i])
    .map(m => Array.isArray(m) ? m : [m, m])
  new Map(modulesToSetMap)
    .forEach((value, key) => packageJson[dependencyType][key] = `file://../${value}`)
}