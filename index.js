import { project, packageJson } from 'ember-apply';
import latestVersion from 'latest-version';

let psdmi = await latestVersion('pnpm-sync-dependencies-meta-injected');

console.log(psdmi);

for (let workspace of await project.getWorkspaces()) {
  let manifest = await packageJson.read(workspace);

  if (manifest.dependenciesMeta) {
    await packageJson.modify(json => {
      json.scripts ||= {};
      json.scripts["_syncPnpm"] = "pnpm sync-dependencies-meta-injected";
    }, workspace);

    await packageJson.addDevDependencies({
      'pnpm-sync-dependencies-meta-injected': psdmi,
    }, workspace);
  }

}
