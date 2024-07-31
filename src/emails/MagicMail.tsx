export function MagicMail(params: {
  url: string;
  host: string;
  theme: any;
  publicUrl: string;
}) {
  const { url, host, theme, publicUrl } = params;
  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
   <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Log in with this magic link.
  </div>
<body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 25px 48px;background-image:url(&quot;/email-logo.svg&quot;);background-position:bottom;background-repeat:no-repeat, no-repeat">
      <tbody>
        <tr style="width:100%">
          <td><img alt="100xcoding.com" height="100" src="https://www.100xcoding.com/email.png" style="display:block;outline:none;border:none;text-decoration:none" width="100" />
            <h1 style="font-size:28px;font-weight:bold;margin-top:48px">We're excited to have you join the 100xcoding community!</h1>
            <p style="font-size:18px;font-weight:500;margin-top:28px">To get started, please click the link below to sign in.</p>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin:24px 0">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:18px;font-weight:500;line-height:26px;margin:16px 0"><a href="${url}" style="color:#FF6363;text-decoration:none" target="_blank">👉 Click here to sign in 👈</a></p>
                    <p style="font-size:16px;line-height:26px;margin:16px 0">If you didn&#x27;t request this, please ignore this email.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:16px;line-height:26px;margin:16px 0">Best,<br />- 100xcoding Team</p>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dddddd;margin-top:48px" /><img height="32" src="https://100xcoding.com/email.png" style="display:block;outline:none;border:none;text-decoration:none;-webkit-filter:grayscale(100%);filter:grayscale(100%);margin:20px 0" width="32" />
            <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa;margin-left:4px">100xcoding.com</p>
            
          </td>
        </tr>
      </tbody>
    </table>
    </body>
</html>
`;
}
