// 11ty community plugins.
import favicons from 'eleventy-plugin-gen-favicons';
import metagen from 'eleventy-plugin-metagen';

// Additional plugins.
import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

// Custom plugins in this project.
import filterDateSimple from './source/_config/filters/date-simple.js';

export default async function(eleventyConfig) {
	// There are some files that we want git to ignore, and not commit to the
	// repository. But 11ty _also_ ignores everything in the `.gitignore`, and we
	// want it to process some of those files! So here we tell 11ty to disable
	// using the `.gitignore`, and only use `.eleventyignore`.
	eleventyConfig.setUseGitIgnore(false);

	// The 11ty plugin configuration above is only used for images that are coded
	// within the HTML _as_ images, i.e. they use the `<img>` tag. If background
	// images are used in slides, they need to be copied over. PassThrough allows
	// 11ty to grab those images and move them into the output site build.
	eleventyConfig.addPassthroughCopy('./source/presentation/**/images/*.*');
	eleventyConfig.addPassthroughCopy('./source/presentation/**/videos/*.*');

	// Add the metagen plugin for 11ty.
	// https://github.com/tannerdolby/eleventy-plugin-metagen
	eleventyConfig.addPlugin(metagen);

	// Add the MarkdownIt plugin to 11ty.
	// https://github.com/markdown-it/markdown-it
	eleventyConfig.setLibrary(
		'md',
		markdownIt({
			html: true,
			breaks: true,
			linkify: true
		}).use(markdownItAttrs)
	);

	// Add the favicon plugin for 11ty.
	// https://github.com/NJAldwin/eleventy-plugin-gen-favicons
	eleventyConfig.addPlugin(favicons, {
		outputDir: './site'
	});

	// Filters and shortcodes are located in `./source/_config/`.

	// Add the filter to convert dates into simple formats.
	eleventyConfig.addPlugin(filterDateSimple);
};

export const config = {
	templateFormats: ['njk', 'md', 'html'],
	htmlTemplateEngine: 'njk',
	markdownTemplateEngine: 'njk',

	// These are the folders that 11ty will use when compiling the built site.
	// The directories for `input` and `output` are relative to the root of the
	// _project_. The directories for `data`, `includes`, and `layouts` are
	// relative to the `input` directory, i.e. `source`.
	dir: {
		output: 'site',
		input: 'source',
		data: '_data',
		includes: '_includes',
		layouts: '_layouts'
	}
};
