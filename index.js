#!/usr/bin/env node

const clone = require("git-clone");
const program = require("commander");
const shell = require("shelljs");
const log = require("tracer").colorConsole();

const createSimpleProject = (template, project) => {
  let pwd = shell.pwd();
  log.info(`正在下载模板代码...`);

  const sourceURL = `https://github.com/zhangxiaoshang/template-${template}.git`;
  const targetPath = `${pwd}/${project}/`;
  clone(sourceURL, targetPath, null, function () {
    shell.rm("-rf", `${targetPath}/.git`);
    log.info("模版代码下载完成");
    log.info(`项目路径：${targetPath}`);
    console.info(`\ncd ${project}`);
    console.info(`\nyarn`);
    console.info(`\nyarn start\n`);
  });
};

program.version("1.0.0").description("帅张脚手架工具");
program.command("* <template> <project>").action(function (template, project) {
  if (!template || !project) {
    log.error("用法：create-project template-name project-name");
    log.error("template-name目前仅支持：simple");
    log.error("project-name 由用户自定义");
  }

  switch (template) {
    case "simple":
      createSimpleProject(template, project);
      break;
    default:
      log.error(`不支持的模版： ${template} `);
      log.error("使用命令: create-project -h 获取帮助");
  }
});
program.parse(process.argv);
