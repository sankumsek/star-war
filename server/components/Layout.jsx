var React = require('react');

class Layout extends React.Component {
    render () {
        var {
            title,
        } = this.props;

        return (
            <html>
                <head lang="en">
                    <title>{title}</title>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                </head>
                <body>
                    <main role="application"></main>
                    <script type="text/javascript" src="javascripts/app.js" />
                    <script type="text/javascript">start()</script>
                </body>
            </html>
        )
    }
}

module.exports = Layout;
