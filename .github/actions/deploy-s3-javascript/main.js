const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
    core.notice("running main.js from custom action");

    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    // github.getOctokit()
    // github.context.

    const s3Uri = `s3://${bucket}`;
    
    exec.exec(`aws s3 sync ${s3Uri} ${distFolder} --region ${bucketRegion}`);

    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl);
}

run();
