const checkNodeVersion = version => {
    const versionRegex = new RegExp(`^${version}\\..*`);
    const versionCorrect = process.versions.node.match(versionRegex);
    if (!versionCorrect) {
        throw Error(
            `Running on wrong Nodejs version. Please upgrade the node runtime to version ${version}`
        );
    }
};
checkNodeVersion(16)
