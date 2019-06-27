
module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? './' : './',
	outputDir: process.env.outputDir, 
	css: {
	    loaderOptions: { // 向 CSS 相关的 loader 传递选项
	      less: {
	        javascriptEnabled: true
	      }
	    }
	}
}