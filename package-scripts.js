export default {
	scripts: {
		/**
			`prepare` will run when `npm install` is run. This will set up some of the files and folders we need for the project. The sample files themselves are not used by 11ty, but they are copied into the directories that 11ty _will_ compile. That way, any forked repositories can get the latest updates to the project, without customizations being overwritten.
		*/
		prepare: {

			// This is the script that npm will run.
			init: "nps prepare.starwipe.init prepare.reveal.init",

			// These scripts are specific to starwipe.
			starwipe: {

				// Run the initial starwipe scripts.
				init: "nps prepare.starwipe.source",

				// Copy the sample files into the actual source files.
				source: "rsync -avq --ignore-existing --mkpath ./source/_sample/* ./source/"
			},

			// These scripts are specific to reveal.js.
			reveal: {

				// Run the initial reveal.js scripts.
				init: "nps prepare.reveal.dist prepare.reveal.plugins",

				// Copy compiled js & css assets from reveal into the `./site/` folder.
				dist: "rsync -avq --ignore-existing --mkpath ./node_modules/reveal.js/dist/ ./site/_assets/reveal/",

				plugins: "rsync -avq --ignore-existing --mkpath ./node_modules/reveal.js/plugin ./site/_assets/reveal/"
			}
		},

		css: {
			"build": "sass --style=compressed --no-source-map ./source/_scss:./site/_assets/css",
			"watch": "sass --watch ./source/_scss:./site/_assets/css"
		},

		/**
			`site` scripts are specific to 11ty. Both will compile the full website, but while `build` builds, `watch` also starts the local 11ty server and watches for any changes to its source files.
		*/
		site: {
			build: "npx @11ty/eleventy --quiet",
			watch: "npx @11ty/eleventy --quiet --serve"
		}
	}
}
