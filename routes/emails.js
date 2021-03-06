const express = require('express');
var bodyParser = require('body-parser') // importing body parser middleware to parse form content from HTML
const router = express.Router();
var nodemailer = require('nodemailer'); //importing node mailer

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NODEMAILER_EMAIL, //replace with your email
		pass: process.env.NODEMAILER_PASSWORD //replace with your password
	}
});

/**
 * POST emails for register
 */
router.post('/register', (req, res, next) => {
	console.log("Send Email", req.body)
	const templateEmail = `
	<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="x-apple-disable-message-reformatting">
	<title>Mummy's Food - Confirmation d'inscription</title>

	<link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">

	<style>
		html,
		body {
			margin: 0 auto !important;
			padding: 0 !important;
			height: 100% !important;
			width: 100% !important;
			background: #fff;
			font-family: 'Work sans', sans-serif;
		}

		* {
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
		}

		div[style*="margin: 16px 0"] {
			margin: 0 !important;
		}

		table,
		td {
			mso-table-lspace: 0pt !important;
			mso-table-rspace: 0pt !important;
		}

		table {
			border-spacing: 0 !important;
			border-collapse: collapse !important;
			table-layout: fixed !important;
			margin: 0 auto !important;
		}

		img {
			-ms-interpolation-mode: bicubic;
		}

		a {
			text-decoration: none;
		}

		*[x-apple-data-detectors],
		.unstyle-auto-detected-links *,
		.aBn {
			border-bottom: 0 !important;
			cursor: default !important;
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}

		img.g-img+div {
			display: none !important;
		}

		@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
			u~div .email-container {
				min-width: 320px !important;
			}
		}

		@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
			u~div .email-container {
				min-width: 375px !important;
			}
		}

		@media only screen and (min-device-width: 414px) {
			u~div .email-container {
				min-width: 414px !important;
			}
		}
	</style>

	<style>
		.primary {
			background: #ffdc8c;
		}

		.bg_white {
			background: #ffffff;
		}

		.bg_black {
			background: #000000;
		}

		.email-section {
			padding: 2em 2em 1em;
		}

		.btn {
			padding: 10px 30px;
			display: inline-block;
		}

		.btn.btn-primary {
			border-radius: 5px;
			background: #ffdc8c;
			color: #ffffff;
		}

		.btn.btn-white {
			border-radius: 5px;
			background: #ffffff;
			color: #000000;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-family: "Work Sans", sans-serif;
			color: #000000;
			margin-top: 0;
			font-weight: 400;
		}

		body {
			font-family: "Work Sans", sans-serif;
			font-weight: 400;
			font-size: 15px;
			line-height: 1.8;
			color: rgba(0, 0, 0, .4);
		}

		.logo h1 {
			margin: 0;
		}

		.logo h1 a {
			color: #ffdc8c;
			font-size: 24px;
			font-weight: 700;
			font-family: "Work Sans", sans-serif;
		}

		.hero {
			position: relative;
			z-index: 0;
		}

		.hero .text {
			color: rgba(0, 0, 0, .3);
		}

		.hero .text h2 {
			color: #000;
			font-size: 34px;
			margin-bottom: 15px;
			font-weight: 300;
			line-height: 1.2;
		}

		.hero .text h3 {
			font-size: 24px;
			font-weight: 200;
		}

		.hero .text h2 span {
			font-weight: 600;
			color: #000;
		}

		.footer {
			color: #fff;
			background-color: #ffcd6e;
		}

		.footer .heading {
			color: #fff;
			font-size: 22px;
			border-bottom: 0.5px solid rgba(255, 255, 255, 0.664);
			padding-bottom: 12px;
			font-weight: 300;
		}

		.footer svg {
			width: 15px;
		}

		@media screen and (max-width: 500px) {}
	</style>
</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #fff;">
	<center style="width: 100%; background-color: #fff;">
		<div
			style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
		</div>
		<div style="max-width: 600px; margin: 0 auto;" class="email-container">
			<!-- BEGIN BODY -->
			<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
				style="margin: auto;">
				<tr>
					<td valign="top" class="bg_white" style="padding: 2.5em 2.5em 0;">
						<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td class="logo" style="text-align: center;">
									<h1>
										<a href="#">
											<img src="http://localhost:4200/assets/images/logo.png" alt="" width="100">
										</a>
									</h1>
								</td>
							</tr>
						</table>
					</td>
				</tr><!-- end tr -->
				<tr>
					<td valign="middle" class="hero bg_white" style="padding: 4em 0 0;">
						<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="padding: 0 2.5em 3em; text-align: left;">
									<div class="text">
										<h2>Bonjour ${req.body.firstname},</h2>
										<h3>Nous vous confirmons votre inscription sur <a
												style="color: #ffdc8c !important; font-weight: 500;"
												href="http://dressingfmr.com">dressingfmr.com</a>, vous pouvez d??s ?? pr??sent vous
											connecter depuis l'application en cliquant sur le bouton ci-dessous.</h3>
										<p style="text-align:center; margin: 40px 0; font-weight: 600;"><a
												href="http://dressingfmr.com/login" class="btn btn-primary">Se connecter</a></p>
										<h3>A tr??s vite sur Mummy's Food !</h3>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr><!-- end tr -->
			</table>
			<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
				style="margin: auto;">
				<tr>
					<td valign="middle" class="footer email-section">
						<table>
							<tr>
								<td valign="top" width="33.333%">
									<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
										<tr>
											<td style="text-align: left; padding-bottom: 20px;">
												<h3 class="heading">
													<span style="font-weight: 600;">MUMMY'S</span> FOOD
												</h3>
												<p style="margin: 0; font-size: 12px;">
													<a href="" style="display: flex; align-items: center; color: white !important;">
														<svg fill="white" version="1.1" id="Layer_1"
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
															viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
															xml:space="preserve">
															<path d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5
																	c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021
																	C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333
																	s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z" />
														</svg>
														<span style="margin-left: 10px;">
															32 rue du Foss?? Mignard
															77700 CHESSY, France
														</span>
													</a>
													<a href="mailto:contact@dressingfmr.com"
														style="display: flex; align-items: center; color: white !important;">
														<svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
															viewBox="0 0 230.17 230.17"
															style="enable-background:new 0 0 230.17 230.17;" xml:space="preserve">
															<path
																d="M230,49.585c0-0.263,0.181-0.519,0.169-0.779l-70.24,67.68l70.156,65.518c0.041-0.468-0.085-0.94-0.085-1.418V49.585z" />
															<path d="M149.207,126.901l-28.674,27.588c-1.451,1.396-3.325,2.096-5.2,2.096c-1.836,0-3.672-0.67-5.113-2.013l-28.596-26.647
		L11.01,195.989c1.717,0.617,3.56,1.096,5.49,1.096h197.667c2.866,0,5.554-0.873,7.891-2.175L149.207,126.901z" />
															<path d="M115.251,138.757L222.447,35.496c-2.427-1.443-5.252-2.411-8.28-2.411H16.5c-3.943,0-7.556,1.531-10.37,3.866
							L115.251,138.757z" />
															<path
																d="M0,52.1v128.484c0,1.475,0.339,2.897,0.707,4.256l69.738-67.156L0,52.1z" />
														</svg>
														<span style="margin-left: 10px;">contact@dressingfmr.com</span>
													</a>
													<a href="tel:0617925189"
														style="display: flex; align-items: center; color: white;">
														<svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
															viewBox="0 0 387.2 387.2" style="enable-background:new 0 0 387.2 387.2;"
															xml:space="preserve">
															<path d="M304.8,10.84l0-0.04C297.927,3.891,288.585,0.004,278.84,0H108.32C88.067,0.066,71.666,16.467,71.6,36.72v313.72
																c0.004,9.745,3.891,19.087,10.8,25.96c6.863,6.899,16.189,10.785,25.92,10.8h170.56c9.731-0.015,19.057-3.901,25.92-10.8
																c6.899-6.863,10.785-16.189,10.8-25.92V36.76C315.585,27.029,311.699,17.703,304.8,10.84z M193.6,362.28L193.6,362.28
																c-5.479,0-9.92-4.441-9.92-9.92c0-5.479,4.441-9.92,9.92-9.92c5.479,0,9.92,4.441,9.92,9.92
																C203.52,357.839,199.079,362.28,193.6,362.28z M286.44,300c0,13.255-10.745,24-24,24H124.72c-13.255,0-24-10.745-24-24V66.2
																c0-13.255,10.745-24,24-24h137.76c13.255,0,24,10.745,24,24L286.44,300z" />
														</svg>
														<span style="margin-left: 10px;">0617925189</span>
													</a>
												</p>
											</td>
										</tr>
										<tr style="border-top: 0.5px solid rgba(255, 255, 255, 0.664);">
											<td>
												<div
													style="display: flex; flex-direction: row; justify-content: center; margin-top: 15px;">
													<a style="margin: 0 15px 0 0;" href="//www.facebook.com/dressingfmr">
														<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 16 16"
															class="d6 d7 bs bt">
															<path
																d="M14.667 0H1.333C.597 0 0 .597 0 1.333v13.334C0 15.403.597 16 1.333 16h7.334v-6h-2V7.333h2V5.61c0-2.067 1.262-3.192 3.106-3.192.883 0 1.642.066 1.863.095v2.16h-1.279c-1.002 0-1.196.477-1.196 1.176v1.485h2.96L13.454 10h-2.293v6h3.506c.736 0 1.333-.597 1.333-1.333V1.333C16 .597 15.403 0 14.667 0z">
															</path>
														</svg>
													</a>
													<a style="margin: 0 15px 0 0;" href="//www.twitter.com/dressingfmr">
														<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 14 12"
															class="d6 d7 bs bt">
															<path fill-rule="evenodd" clip-rule="evenodd"
																d="M13.973 1.429a5.556 5.556 0 01-1.649.476A3.02 3.02 0 0013.587.231c-.554.34-1.169.59-1.823.728A2.792 2.792 0 009.668 0c-1.585 0-2.87 1.356-2.87 3.025 0 .24.026.47.074.692-2.385-.12-4.5-1.328-5.916-3.154-.249.443-.388.96-.388 1.522 0 1.051.507 1.976 1.276 2.52a2.754 2.754 0 01-1.3-.378v.036c0 1.467.988 2.692 2.302 2.97a2.776 2.776 0 01-1.29.052c.368 1.202 1.426 2.077 2.685 2.102A5.566 5.566 0 010 10.641 7.856 7.856 0 004.407 12c5.282 0 8.168-4.611 8.168-8.604 0-.13 0-.259-.01-.388.56-.424 1.05-.959 1.435-1.567l-.027-.012z">
															</path>
														</svg>
													</a>
													<a style="margin: 0 15px 0 0;" href="//www.instagram.com/dressingfmr">
														<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 16 16"
															class="d6 d7 bs bt">
															<path fill-rule="evenodd" clip-rule="evenodd"
																d="M8 0C5.827 0 5.555.01 4.702.048 3.85.088 3.27.222 2.76.42a3.908 3.908 0 00-1.417.923c-.445.444-.72.89-.923 1.417-.198.51-.333 1.09-.372 1.942C.008 5.555 0 5.827 0 8s.01 2.445.048 3.298c.04.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.72 1.417.923.51.198 1.09.333 1.942.372.853.04 1.125.048 3.298.048s2.445-.01 3.298-.048c.852-.04 1.433-.174 1.942-.372a3.908 3.908 0 001.417-.923c.445-.444.72-.89.923-1.417.198-.51.333-1.09.372-1.942.04-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.852-.174-1.433-.372-1.942a3.908 3.908 0 00-.923-1.417A3.886 3.886 0 0013.24.42c-.51-.198-1.09-.333-1.942-.372C10.445.008 10.173 0 8 0zm0 1.44c2.136 0 2.39.01 3.233.048.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.05 3.233c-.04.78-.17 1.203-.28 1.485-.15.374-.32.64-.6.92-.28.28-.55.453-.92.598-.28.11-.71.24-1.49.276-.85.038-1.1.047-3.24.047s-2.39-.01-3.24-.05c-.78-.04-1.21-.17-1.49-.28a2.49 2.49 0 01-.92-.6c-.28-.28-.46-.55-.6-.92-.11-.28-.24-.71-.28-1.49-.03-.84-.04-1.1-.04-3.23s.01-2.39.04-3.24c.04-.78.17-1.21.28-1.49.14-.38.32-.64.6-.92.28-.28.54-.46.92-.6.28-.11.7-.24 1.48-.28.85-.03 1.1-.04 3.24-.04L8 1.44zm0 2.452a4.108 4.108 0 100 8.215 4.108 4.108 0 000-8.215zm0 6.775a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm5.23-6.937a.96.96 0 11-1.92 0 .96.96 0 011.92 0z">
															</path>
														</svg>
													</a>
												</div>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="text-align: center; font-size: 10px; background: #f7f0e6;">
						<p style="color: #cecece">Ceci est un email automatique, merci de ne pas y r??pondre.</a></p>
					</td>
				</tr>
			</table>

		</div>
	</center>
</body>

</html>`;

	var mailOptions = {
		from: 'Mummy\'s Food <contact@dressingfmr.com>', //replace with your email
		to: req.body.email, //replace with your email
		subject: `Votre inscription est confirm??e !`,
		html: templateEmail
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			res.send('error') // if error occurs send error as response to client
		} else {
			console.log('Email for register sent: ' + info.response);
			res.send('Sent Successfully') //if mail is sent successfully send Sent successfully as response
		}
	});
})

/**
 * POST emails for contact page
 */
router.post('/contact', (req, res, next) => {
	console.log("Send Email", req.body)
	const templateEmail = `
	<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="x-apple-disable-message-reformatting">
	<title>Mummy's Food - Contact</title>

	<link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">

	<style>
		html,
		body {
			margin: 0 auto !important;
			padding: 0 !important;
			height: 100% !important;
			width: 100% !important;
			background: #fff;
			font-family: 'Work sans', sans-serif;
		}

		* {
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
		}

		div[style*="margin: 16px 0"] {
			margin: 0 !important;
		}

		table,
		td {
			mso-table-lspace: 0pt !important;
			mso-table-rspace: 0pt !important;
		}

		table {
			border-spacing: 0 !important;
			border-collapse: collapse !important;
			table-layout: fixed !important;
			margin: 0 auto !important;
		}

		img {
			-ms-interpolation-mode: bicubic;
		}

		a {
			text-decoration: none;
		}

		*[x-apple-data-detectors],
		.unstyle-auto-detected-links *,
		.aBn {
			border-bottom: 0 !important;
			cursor: default !important;
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}

		img.g-img+div {
			display: none !important;
		}

		@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
			u~div .email-container {
				min-width: 320px !important;
			}
		}

		@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
			u~div .email-container {
				min-width: 375px !important;
			}
		}

		@media only screen and (min-device-width: 414px) {
			u~div .email-container {
				min-width: 414px !important;
			}
		}
	</style>

	<style>
		.primary {
			background: #ffdc8c;
		}

		.bg_white {
			background: #ffffff;
		}

		.bg_black {
			background: #000000;
		}

		.email-section {
			padding: 2em 2em 1em;
		}

		.btn {
			padding: 10px 30px;
			display: inline-block;
		}

		.btn.btn-primary {
			border-radius: 5px;
			background: #ffdc8c;
			color: #ffffff;
		}

		.btn.btn-white {
			border-radius: 5px;
			background: #ffffff;
			color: #000000;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-family: "Work Sans", sans-serif;
			color: #000000;
			margin-top: 0;
			font-weight: 400;
		}

		body {
			font-family: "Work Sans", sans-serif;
			font-weight: 400;
			font-size: 15px;
			line-height: 1.8;
			color: rgba(0, 0, 0, .4);
		}

		.logo h1 {
			margin: 0;
		}

		.logo h1 a {
			color: #ffdc8c;
			font-size: 24px;
			font-weight: 700;
			font-family: "Work Sans", sans-serif;
		}

		.hero {
			position: relative;
			z-index: 0;
		}

		.hero .text {
			color: rgba(0, 0, 0, .3);
		}

		.hero .text h2 {
			color: #000;
			font-size: 34px;
			margin-bottom: 15px;
			font-weight: 300;
			line-height: 1.2;
		}

		.hero .text h3 {
			font-size: 24px;
			font-weight: 200;
		}

		.hero .text h2 span {
			font-weight: 600;
			color: #000;
		}

		.footer {
			color: #fff;
			background-color: #ffcd6e;
		}

		.footer .heading {
			color: #fff;
			font-size: 22px;
			border-bottom: 0.5px solid rgba(255, 255, 255, 0.664);
			padding-bottom: 12px;
			font-weight: 300;
		}

		.footer svg {
			width: 15px;
		}

		@media screen and (max-width: 500px) {}
	</style>
</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #fff;">
	<center style="width: 100%; background-color: #fff;">
		<div
			style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
		</div>
		<div style="max-width: 600px; margin: 0 auto;" class="email-container">
			<!-- BEGIN BODY -->
			<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
				style="margin: auto;">
				<tr>
					<td valign="top" class="bg_white" style="padding: 2.5em 2.5em 0;">
						<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td class="logo" style="text-align: center;">
									<h1>
										<a href="#">
											<img src="http://localhost:4200/assets/images/logo.png" alt="" width="100">
										</a>
									</h1>
								</td>
							</tr>
						</table>
					</td>
				</tr><!-- end tr -->
				<tr>
					<td valign="middle" class="hero bg_white" style="padding: 4em 0 0;">
						<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="padding: 0 2.5em 3em; text-align: left;">
									<div class="text">
										<h2>Bonjour Zora,</h2>
										<h3>${req.body.name} a une question ?? vous poser, voici le d??tail :</h3>
										<h3>${req.body.message}</h3>
										<p style="text-align:center; margin: 40px 0; font-weight: 600;"><a
												href="mailto:${req.body.email}" class="btn btn-primary">R??pondre</a></p>
										<h3>Mummy's Food application.</h3>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr><!-- end tr -->
			</table>
			<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
				style="margin: auto;">
				<tr>
					<td valign="middle" class="footer email-section">
						<table>
							<tr>
								<td valign="top" width="33.333%">
									<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
										<tr>
											<td style="text-align: left; padding-bottom: 20px;">
												<h3 class="heading">
													<span style="font-weight: 600;">MUMMY'S</span> FOOD
												</h3>
												<p style="margin: 0; font-size: 12px;">
													<a href="" style="display: flex; align-items: center; color: white !important;">
														<svg fill="white" version="1.1" id="Layer_1"
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
															viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
															xml:space="preserve">
															<path d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5
																	c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021
																	C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333
																	s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z" />
														</svg>
														<span style="margin-left: 10px;">
															32 rue du Foss?? Mignard
															77700 CHESSY, France
														</span>
													</a>
													<a href="mailto:contact@dressingfmr.com"
														style="display: flex; align-items: center; color: white !important;">
														<svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
															viewBox="0 0 230.17 230.17"
															style="enable-background:new 0 0 230.17 230.17;" xml:space="preserve">
															<path
																d="M230,49.585c0-0.263,0.181-0.519,0.169-0.779l-70.24,67.68l70.156,65.518c0.041-0.468-0.085-0.94-0.085-1.418V49.585z" />
															<path d="M149.207,126.901l-28.674,27.588c-1.451,1.396-3.325,2.096-5.2,2.096c-1.836,0-3.672-0.67-5.113-2.013l-28.596-26.647
		L11.01,195.989c1.717,0.617,3.56,1.096,5.49,1.096h197.667c2.866,0,5.554-0.873,7.891-2.175L149.207,126.901z" />
															<path d="M115.251,138.757L222.447,35.496c-2.427-1.443-5.252-2.411-8.28-2.411H16.5c-3.943,0-7.556,1.531-10.37,3.866
							L115.251,138.757z" />
															<path
																d="M0,52.1v128.484c0,1.475,0.339,2.897,0.707,4.256l69.738-67.156L0,52.1z" />
														</svg>
														<span style="margin-left: 10px;">contact@dressingfmr.com</span>
													</a>
													<a href="tel:0617925189"
														style="display: flex; align-items: center; color: white;">
														<svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
															viewBox="0 0 387.2 387.2" style="enable-background:new 0 0 387.2 387.2;"
															xml:space="preserve">
															<path d="M304.8,10.84l0-0.04C297.927,3.891,288.585,0.004,278.84,0H108.32C88.067,0.066,71.666,16.467,71.6,36.72v313.72
																c0.004,9.745,3.891,19.087,10.8,25.96c6.863,6.899,16.189,10.785,25.92,10.8h170.56c9.731-0.015,19.057-3.901,25.92-10.8
																c6.899-6.863,10.785-16.189,10.8-25.92V36.76C315.585,27.029,311.699,17.703,304.8,10.84z M193.6,362.28L193.6,362.28
																c-5.479,0-9.92-4.441-9.92-9.92c0-5.479,4.441-9.92,9.92-9.92c5.479,0,9.92,4.441,9.92,9.92
																C203.52,357.839,199.079,362.28,193.6,362.28z M286.44,300c0,13.255-10.745,24-24,24H124.72c-13.255,0-24-10.745-24-24V66.2
																c0-13.255,10.745-24,24-24h137.76c13.255,0,24,10.745,24,24L286.44,300z" />
														</svg>
														<span style="margin-left: 10px;">0617925189</span>
													</a>
												</p>
											</td>
										</tr>
										<tr style="border-top: 0.5px solid rgba(255, 255, 255, 0.664);">
											<td>
												<div
													style="display: flex; flex-direction: row; justify-content: center; margin-top: 15px;">
													<a style="margin: 0 15px 0 0;" href="//www.facebook.com/dressingfmr">
														<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 16 16"
															class="d6 d7 bs bt">
															<path
																d="M14.667 0H1.333C.597 0 0 .597 0 1.333v13.334C0 15.403.597 16 1.333 16h7.334v-6h-2V7.333h2V5.61c0-2.067 1.262-3.192 3.106-3.192.883 0 1.642.066 1.863.095v2.16h-1.279c-1.002 0-1.196.477-1.196 1.176v1.485h2.96L13.454 10h-2.293v6h3.506c.736 0 1.333-.597 1.333-1.333V1.333C16 .597 15.403 0 14.667 0z">
															</path>
														</svg>
													</a>
													<a style="margin: 0 15px 0 0;" href="//www.twitter.com/dressingfmr">
														<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 14 12"
															class="d6 d7 bs bt">
															<path fill-rule="evenodd" clip-rule="evenodd"
																d="M13.973 1.429a5.556 5.556 0 01-1.649.476A3.02 3.02 0 0013.587.231c-.554.34-1.169.59-1.823.728A2.792 2.792 0 009.668 0c-1.585 0-2.87 1.356-2.87 3.025 0 .24.026.47.074.692-2.385-.12-4.5-1.328-5.916-3.154-.249.443-.388.96-.388 1.522 0 1.051.507 1.976 1.276 2.52a2.754 2.754 0 01-1.3-.378v.036c0 1.467.988 2.692 2.302 2.97a2.776 2.776 0 01-1.29.052c.368 1.202 1.426 2.077 2.685 2.102A5.566 5.566 0 010 10.641 7.856 7.856 0 004.407 12c5.282 0 8.168-4.611 8.168-8.604 0-.13 0-.259-.01-.388.56-.424 1.05-.959 1.435-1.567l-.027-.012z">
															</path>
														</svg>
													</a>
													<a style="margin: 0 15px 0 0;" href="//www.instagram.com/dressingfmr">
														<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 16 16"
															class="d6 d7 bs bt">
															<path fill-rule="evenodd" clip-rule="evenodd"
																d="M8 0C5.827 0 5.555.01 4.702.048 3.85.088 3.27.222 2.76.42a3.908 3.908 0 00-1.417.923c-.445.444-.72.89-.923 1.417-.198.51-.333 1.09-.372 1.942C.008 5.555 0 5.827 0 8s.01 2.445.048 3.298c.04.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.72 1.417.923.51.198 1.09.333 1.942.372.853.04 1.125.048 3.298.048s2.445-.01 3.298-.048c.852-.04 1.433-.174 1.942-.372a3.908 3.908 0 001.417-.923c.445-.444.72-.89.923-1.417.198-.51.333-1.09.372-1.942.04-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.852-.174-1.433-.372-1.942a3.908 3.908 0 00-.923-1.417A3.886 3.886 0 0013.24.42c-.51-.198-1.09-.333-1.942-.372C10.445.008 10.173 0 8 0zm0 1.44c2.136 0 2.39.01 3.233.048.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.05 3.233c-.04.78-.17 1.203-.28 1.485-.15.374-.32.64-.6.92-.28.28-.55.453-.92.598-.28.11-.71.24-1.49.276-.85.038-1.1.047-3.24.047s-2.39-.01-3.24-.05c-.78-.04-1.21-.17-1.49-.28a2.49 2.49 0 01-.92-.6c-.28-.28-.46-.55-.6-.92-.11-.28-.24-.71-.28-1.49-.03-.84-.04-1.1-.04-3.23s.01-2.39.04-3.24c.04-.78.17-1.21.28-1.49.14-.38.32-.64.6-.92.28-.28.54-.46.92-.6.28-.11.7-.24 1.48-.28.85-.03 1.1-.04 3.24-.04L8 1.44zm0 2.452a4.108 4.108 0 100 8.215 4.108 4.108 0 000-8.215zm0 6.775a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm5.23-6.937a.96.96 0 11-1.92 0 .96.96 0 011.92 0z">
															</path>
														</svg>
													</a>
												</div>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="text-align: center; font-size: 10px; background: #f7f0e6;">
						<p style="color: #cecece">Ceci est un email automatique, merci de ne pas y r??pondre.</a></p>
					</td>
				</tr>
			</table>

		</div>
	</center>
</body>

</html>`;

	var mailOptions = {
		from: 'Mummy\'s Food <contact@dressingfmr.com>', //replace with your email
		to: 'zora.khadir@gmail.com', //replace with your email
		subject: `Zora, un client a une question pour vous !`,
		html: templateEmail
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			res.json({
				error: error.message
			}) // if error occurs send error as response to client
		} else {
			console.log('Email for contact sent: ' + info.response);
			res.json({
				message: 'Email sent with successfully'
			}) //if mail is sent successfully send Sent successfully as response
		}
	});
})

/**
 * POST emails for order page
 */
router.post('/order', (req, res, next) => {
	console.log("Send email order", req.body);

	let carts = JSON.parse(req.body.carts);
	let newCarts = [];
	for (let i = 0; i < carts.length; i++) {
		console.log('qdfqsdf', i);
		let obj = {
			name: carts[i].name,
			qty: carts[i].quantity,
			price: carts[i].price
		};
		newCarts.push(obj);
		console.log('newCarts', newCarts);
	}

	let templateEmail = `
	<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="x-apple-disable-message-reformatting">
	<title>Mummy's Food - Commande confirm??e</title>

	<link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">
	<style>
		html,
		body {
			margin: 0 auto !important;
			padding: 0 !important;
			height: 100% !important;
			width: 100% !important;
			background: #fff;
			font-family: 'Work sans', sans-serif;
		}

		* {
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
		}

		div[style*="margin: 16px 0"] {
			margin: 0 !important;
		}

		table,
		td {
			mso-table-lspace: 0pt !important;
			mso-table-rspace: 0pt !important;
		}

		table {
			border-spacing: 0 !important;
			border-collapse: collapse !important;
			table-layout: fixed !important;
			margin: 0 auto !important;
		}

		img {
			-ms-interpolation-mode: bicubic;
		}

		a {
			text-decoration: none;
		}

		*[x-apple-data-detectors],
		.unstyle-auto-detected-links *,
		.aBn {
			border-bottom: 0 !important;
			cursor: default !important;
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}

		img.g-img+div {
			display: none !important;
		}

		@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
			u~div .email-container {
				min-width: 320px !important;
			}
		}

		@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
			u~div .email-container {
				min-width: 375px !important;
			}
		}

		@media only screen and (min-device-width: 414px) {
			u~div .email-container {
				min-width: 414px !important;
			}
		}
	</style>

	<style>
		.primary {
			background: #ffdc8c;
		}

		.bg_white {
			background: #ffffff;
		}

		.bg_black {
			background: #000000;
		}

		.email-section {
			padding: 2em 2em 1em;
		}

		.btn {
			padding: 10px 30px;
			display: inline-block;
		}

		.btn.btn-primary {
			border-radius: 5px;
			background: #ffdc8c;
			color: #ffffff;
		}

		.btn.btn-white {
			border-radius: 5px;
			background: #ffffff;
			color: #000000;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-family: "Work Sans", sans-serif;
			color: #000000;
			margin-top: 0;
			font-weight: 400;
		}

		body {
			font-family: "Work Sans", sans-serif;
			font-weight: 400;
			font-size: 15px;
			line-height: 1.8;
			color: rgba(0, 0, 0, .4);
		}

		.logo h1 {
			margin: 0;
		}

		.logo h1 a {
			color: #ffdc8c;
			font-size: 24px;
			font-weight: 700;
			font-family: "Work Sans", sans-serif;
		}

		.hero {
			position: relative;
			z-index: 0;
		}

		.hero .text {
			color: rgba(0, 0, 0, .3);
		}

		.hero .text h2 {
			color: #000;
			font-size: 34px;
			margin-bottom: 15px;
			font-weight: 300;
			line-height: 1.2;
		}

		.hero .text h3 {
			font-size: 20px;
			font-weight: 200;
		}

		.hero .text h2 span {
			font-weight: 600;
			color: #000;
		}

		.order-head {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid rgba(0,0,0,.05);
		}

		.order-head h2 {
			margin: 0;
			font-size: 35px;
			font-weight: 600;
		}

		.order-head h3 {
			margin: 0;
			font-weight: 600;
			font-size: 25px;
		}

		.product-entry {
			padding: 20px 0;
		}

		.product-entry .text {
			display: flex;
			flex-direction: row;
			width: 100%;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 5px;
		}

		.product-entry .text h3,
		.product-entry .text h4,
		.product-entry .text p {
			margin-bottom: 0;
			padding-bottom: 0;
		}

		.product-entry .text p {
			margin-top: 0;
		}
		.product-entry .text h3 {
			display: flex;
			flex-direction: row;
			font-size: 13px;
		}

		.product-entry .text h3 span {
			border: 2px solid #ffcd6d;
			color: #ffcd6d;
			padding: 1px 1px;
			font-size: 12px;
			border-radius: 5px;
			font-weight: 500;
			text-align: center;
			width: 23px;
			margin-right: 10px;
		}

		.footer {
			color: #fff;
			background-color: #ffcd6e;
		}

		.footer .heading {
			color: #fff;
			font-size: 22px;
			border-bottom: 0.5px solid rgba(255, 255, 255, 0.664);
			padding-bottom: 12px;
			font-weight: 300;
		}

		.footer svg {
			width: 15px;
		}

		@media screen and (max-width: 500px) {}
	</style>
</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #fff;">
	<center style="width: 100%; background-color: #fff;">
		<div
			style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
		</div>
		<div style="max-width: 600px; margin: 0 auto;" class="email-container">
			<!-- BEGIN BODY -->
			<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
				style="margin: auto;">
				<tr>
					<td valign="top" class="bg_white" style="padding: 2.5em 2.5em 0;">
						<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td class="logo" style="text-align: center;">
									<h1>
										<a href="#">
											<img src="http://localhost:4200/assets/images/logo.png" alt="" width="100">
										</a>
									</h1>
								</td>
							</tr>
						</table>
					</td>
				</tr><!-- end tr -->
				<tr>
					<td valign="middle" class="hero bg_white" style="padding: 4em 0 0;">
						<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="padding: 0 2.5em 1em; text-align: left;">
									<div class="text">
										<h2>Bonjour ${req.body.clientName},</h2>
										<h3>Merci d'avoir pass?? commande sur <a
												style="color: #ffdc8c !important; font-weight: 500;"
												href="http://dressingfmr.com">dressingfmr.com</a>, voici le d??tail :</h3>
									</div>
								</td>
							</tr>
							<tr>
								<table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0"
									style="padding-bottom: 20px;" width="100%">
									<tr>
										<th width="80%"
											style="text-align:left; padding: 0 2em; color: #000; padding-bottom: 10px">
											<div class="order-head">
												<h3>Total</h3>
												<h2>${req.body.total.toFixed(2).toString().replace('.', ',')} ???</h2>
											</div>
										</th>
									</tr>
									<tr>
										<td valign="middle" width="100%" class="row-product"
											style="text-align:left; padding: 0 2.5em;">
											<div class="product-entry">
												`;

	for (const {
			name,
			qty,
			price
		} of newCarts) {
		const newPrice = parseFloat(price).toFixed(2).toString().replace('.', ',');
		templateEmail += (
			'<div class="text">' +
			'<h3><span class="qty-product">'+ qty + 'x</span>' + name + '</h3>' +
			'<h4>' + newPrice + ' ???</h4></div>'
		);
	}

	templateEmail += `
												<p style="margin-top: 5em; font-size: 11px;">Pour consulter vos re??us (et vos factures le cas ??ch??ant), ou pour obtenir plus
												d'informations, rendez-vous sur votre espace personnel.</p>
											</div>
										</td>
									</tr>
								</table>
							</tr>
						</table>
					</td>
				</tr><!-- end tr -->
			</table>
			<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
				style="margin: auto;">
				<tr>
					<td valign="middle" class="footer email-section">
						<table>
							<tr>
								<td valign="top" width="33.333%">
									<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
										<tr>
											<td style="text-align: left; padding-bottom: 20px;">
												<h3 class="heading">
													<span style="font-weight: 600;">MUMMY'S</span> FOOD
												</h3>
												<p style="margin: 0; font-size: 12px;">
													<a href="" style="display: flex; align-items: center; color: white !important;">
														<svg fill="white" version="1.1" id="Layer_1"
															xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
															viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
															xml:space="preserve">
															<path d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5
																	c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021
																	C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333
																	s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z" />
														</svg>
														<span style="margin-left: 10px;">
															32 rue du Foss?? Mignard
															77700 CHESSY, France
														</span>
													</a>
													<a href="mailto:contact@dressingfmr.com"
														style="display: flex; align-items: center; color: white !important;">
														<svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
															viewBox="0 0 230.17 230.17"
															style="enable-background:new 0 0 230.17 230.17;" xml:space="preserve">
															<path
																d="M230,49.585c0-0.263,0.181-0.519,0.169-0.779l-70.24,67.68l70.156,65.518c0.041-0.468-0.085-0.94-0.085-1.418V49.585z" />
															<path d="M149.207,126.901l-28.674,27.588c-1.451,1.396-3.325,2.096-5.2,2.096c-1.836,0-3.672-0.67-5.113-2.013l-28.596-26.647
		L11.01,195.989c1.717,0.617,3.56,1.096,5.49,1.096h197.667c2.866,0,5.554-0.873,7.891-2.175L149.207,126.901z" />
															<path d="M115.251,138.757L222.447,35.496c-2.427-1.443-5.252-2.411-8.28-2.411H16.5c-3.943,0-7.556,1.531-10.37,3.866
							L115.251,138.757z" />
															<path
																d="M0,52.1v128.484c0,1.475,0.339,2.897,0.707,4.256l69.738-67.156L0,52.1z" />
														</svg>
														<span style="margin-left: 10px;">contact@dressingfmr.com</span>
													</a>
													<a href="tel:0617925189"
														style="display: flex; align-items: center; color: white;">
														<svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
															xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
															viewBox="0 0 387.2 387.2" style="enable-background:new 0 0 387.2 387.2;"
															xml:space="preserve">
															<path d="M304.8,10.84l0-0.04C297.927,3.891,288.585,0.004,278.84,0H108.32C88.067,0.066,71.666,16.467,71.6,36.72v313.72
																c0.004,9.745,3.891,19.087,10.8,25.96c6.863,6.899,16.189,10.785,25.92,10.8h170.56c9.731-0.015,19.057-3.901,25.92-10.8
																c6.899-6.863,10.785-16.189,10.8-25.92V36.76C315.585,27.029,311.699,17.703,304.8,10.84z M193.6,362.28L193.6,362.28
																c-5.479,0-9.92-4.441-9.92-9.92c0-5.479,4.441-9.92,9.92-9.92c5.479,0,9.92,4.441,9.92,9.92
																C203.52,357.839,199.079,362.28,193.6,362.28z M286.44,300c0,13.255-10.745,24-24,24H124.72c-13.255,0-24-10.745-24-24V66.2
																c0-13.255,10.745-24,24-24h137.76c13.255,0,24,10.745,24,24L286.44,300z" />
														</svg>
														<span style="margin-left: 10px;">0617925189</span>
													</a>
												</p>
											</td>
										</tr>
										<tr style="border-top: 0.5px solid rgba(255, 255, 255, 0.664);">
											<td>
												<div
													style="display: flex; flex-direction: row; justify-content: center; margin-top: 15px;">
													<a style="margin: 0 15px 0 0;" href="//www.facebook.com/dressingfmr">
														<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 16 16"
															class="d6 d7 bs bt">
															<path
																d="M14.667 0H1.333C.597 0 0 .597 0 1.333v13.334C0 15.403.597 16 1.333 16h7.334v-6h-2V7.333h2V5.61c0-2.067 1.262-3.192 3.106-3.192.883 0 1.642.066 1.863.095v2.16h-1.279c-1.002 0-1.196.477-1.196 1.176v1.485h2.96L13.454 10h-2.293v6h3.506c.736 0 1.333-.597 1.333-1.333V1.333C16 .597 15.403 0 14.667 0z">
															</path>
														</svg>
													</a>
													<a style="margin: 0 15px 0 0;" href="//www.twitter.com/dressingfmr">
														<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 14 12"
															class="d6 d7 bs bt">
															<path fill-rule="evenodd" clip-rule="evenodd"
																d="M13.973 1.429a5.556 5.556 0 01-1.649.476A3.02 3.02 0 0013.587.231c-.554.34-1.169.59-1.823.728A2.792 2.792 0 009.668 0c-1.585 0-2.87 1.356-2.87 3.025 0 .24.026.47.074.692-2.385-.12-4.5-1.328-5.916-3.154-.249.443-.388.96-.388 1.522 0 1.051.507 1.976 1.276 2.52a2.754 2.754 0 01-1.3-.378v.036c0 1.467.988 2.692 2.302 2.97a2.776 2.776 0 01-1.29.052c.368 1.202 1.426 2.077 2.685 2.102A5.566 5.566 0 010 10.641 7.856 7.856 0 004.407 12c5.282 0 8.168-4.611 8.168-8.604 0-.13 0-.259-.01-.388.56-.424 1.05-.959 1.435-1.567l-.027-.012z">
															</path>
														</svg>
													</a>
													<a style="margin: 0 15px 0 0;" href="//www.instagram.com/dressingfmr">
														<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 16 16"
															class="d6 d7 bs bt">
															<path fill-rule="evenodd" clip-rule="evenodd"
																d="M8 0C5.827 0 5.555.01 4.702.048 3.85.088 3.27.222 2.76.42a3.908 3.908 0 00-1.417.923c-.445.444-.72.89-.923 1.417-.198.51-.333 1.09-.372 1.942C.008 5.555 0 5.827 0 8s.01 2.445.048 3.298c.04.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.72 1.417.923.51.198 1.09.333 1.942.372.853.04 1.125.048 3.298.048s2.445-.01 3.298-.048c.852-.04 1.433-.174 1.942-.372a3.908 3.908 0 001.417-.923c.445-.444.72-.89.923-1.417.198-.51.333-1.09.372-1.942.04-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.852-.174-1.433-.372-1.942a3.908 3.908 0 00-.923-1.417A3.886 3.886 0 0013.24.42c-.51-.198-1.09-.333-1.942-.372C10.445.008 10.173 0 8 0zm0 1.44c2.136 0 2.39.01 3.233.048.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.05 3.233c-.04.78-.17 1.203-.28 1.485-.15.374-.32.64-.6.92-.28.28-.55.453-.92.598-.28.11-.71.24-1.49.276-.85.038-1.1.047-3.24.047s-2.39-.01-3.24-.05c-.78-.04-1.21-.17-1.49-.28a2.49 2.49 0 01-.92-.6c-.28-.28-.46-.55-.6-.92-.11-.28-.24-.71-.28-1.49-.03-.84-.04-1.1-.04-3.23s.01-2.39.04-3.24c.04-.78.17-1.21.28-1.49.14-.38.32-.64.6-.92.28-.28.54-.46.92-.6.28-.11.7-.24 1.48-.28.85-.03 1.1-.04 3.24-.04L8 1.44zm0 2.452a4.108 4.108 0 100 8.215 4.108 4.108 0 000-8.215zm0 6.775a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm5.23-6.937a.96.96 0 11-1.92 0 .96.96 0 011.92 0z">
															</path>
														</svg>
													</a>
												</div>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="text-align: center; font-size: 10px; background: #f7f0e6;">
						<p style="color: #cecece">Ceci est un email automatique, merci de ne pas y r??pondre.</a></p>
					</td>
				</tr>
			</table>

		</div>
	</center>
</body>
</html>`;

	var mailOptions = {
		from: 'Mummy\'s Food <contact@dressingfmr.com>', //replace with your email
		to: req.body.email, //replace with your email
		subject: `Commande confirm??e !`,
		html: templateEmail
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			res.json({
				error: error.message
			}) // if error occurs send error as response to client
		} else {
			console.log('Email for order sent: ' + info.response);
			res.json({
				message: 'Email order sent with successfully.'
			}) //if mail is sent successfully send Sent successfully as response
		}
	});
})


/**
 * POST emails for lost password
 */
router.post('/lostPassword', (req, res, next) => {
	console.log("Send Email", req.body)
	const templateEmail = `
	<!DOCTYPE html>
	<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
		xmlns:o="urn:schemas-microsoft-com:office:office">
	
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="x-apple-disable-message-reformatting">
		<title>Mummy's Food - Reinitialiser votre mot de passe !</title>
	
		<link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">
	
		<style>
			html,
			body {
				margin: 0 auto !important;
				padding: 0 !important;
				height: 100% !important;
				width: 100% !important;
				background: #fff;
				font-family: 'Work sans', sans-serif;
			}
	
			* {
				-ms-text-size-adjust: 100%;
				-webkit-text-size-adjust: 100%;
			}
	
			div[style*="margin: 16px 0"] {
				margin: 0 !important;
			}
	
			table,
			td {
				mso-table-lspace: 0pt !important;
				mso-table-rspace: 0pt !important;
			}
	
			table {
				border-spacing: 0 !important;
				border-collapse: collapse !important;
				table-layout: fixed !important;
				margin: 0 auto !important;
			}
	
			img {
				-ms-interpolation-mode: bicubic;
			}
	
			a {
				text-decoration: none;
			}
	
			*[x-apple-data-detectors],
			.unstyle-auto-detected-links *,
			.aBn {
				border-bottom: 0 !important;
				cursor: default !important;
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}
	
			img.g-img+div {
				display: none !important;
			}
	
			@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
				u~div .email-container {
					min-width: 320px !important;
				}
			}
	
			@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
				u~div .email-container {
					min-width: 375px !important;
				}
			}
	
			@media only screen and (min-device-width: 414px) {
				u~div .email-container {
					min-width: 414px !important;
				}
			}
		</style>
	
		<style>
			.primary {
				background: #ffdc8c;
			}
	
			.bg_white {
				background: #ffffff;
			}
	
			.bg_black {
				background: #000000;
			}
	
			.email-section {
				padding: 2em 2em 1em;
			}
	
			.btn {
				padding: 10px 30px;
				display: inline-block;
			}
	
			.btn.btn-primary {
				border-radius: 5px;
				background: #ffdc8c;
				color: #ffffff;
			}
	
			.btn.btn-white {
				border-radius: 5px;
				background: #ffffff;
				color: #000000;
			}
	
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				font-family: "Work Sans", sans-serif;
				color: #000000;
				margin-top: 0;
				font-weight: 400;
			}
	
			body {
				font-family: "Work Sans", sans-serif;
				font-weight: 400;
				font-size: 15px;
				line-height: 1.8;
				color: rgba(0, 0, 0, .4);
			}
	
			.logo h1 {
				margin: 0;
			}
	
			.logo h1 a {
				color: #ffdc8c;
				font-size: 24px;
				font-weight: 700;
				font-family: "Work Sans", sans-serif;
			}
	
			.hero {
				position: relative;
				z-index: 0;
			}
	
			.hero .text {
				color: rgba(0, 0, 0, .3);
			}
	
			.hero .text h2 {
				color: #000;
				font-size: 34px;
				margin-bottom: 15px;
				font-weight: 300;
				line-height: 1.2;
			}
	
			.hero .text h3 {
				font-size: 24px;
				font-weight: 200;
			}
	
			.hero .text h2 span {
				font-weight: 600;
				color: #000;
			}
	
			.footer {
				color: #fff;
				background-color: #ffcd6e;
			}
	
			.footer .heading {
				color: #fff;
				font-size: 22px;
				border-bottom: 0.5px solid rgba(255, 255, 255, 0.664);
				padding-bottom: 12px;
				font-weight: 300;
			}
	
			.footer svg {
				width: 15px;
			}
	
			@media screen and (max-width: 500px) {}
		</style>
	</head>
	
	<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #fff;">
		<center style="width: 100%; background-color: #fff;">
			<div
				style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
			</div>
			<div style="max-width: 600px; margin: 0 auto;" class="email-container">
				<!-- BEGIN BODY -->
				<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
					style="margin: auto;">
					<tr>
						<td valign="top" class="bg_white" style="padding: 2.5em 2.5em 0;">
							<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
								<tr>
									<td class="logo" style="text-align: center;">
										<h1>
											<a href="#">
												<img src="http://localhost:4200/assets/images/logo.png" alt="" width="100">
											</a>
										</h1>
									</td>
								</tr>
							</table>
						</td>
					</tr><!-- end tr -->
					<tr>
						<td valign="middle" class="hero bg_white" style="padding: 4em 0 0;">
							<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
								<tr>
									<td style="padding: 0 2.5em 3em; text-align: left;">
										<div class="text">
											<h2>Bonjour ${req.body.email},</h2>
											<h3>Pour r??initialiser votre mot passe, veuillez cliquer sur le lien suivant :</h3>
											<p style="text-align:center; margin: 40px 0; font-weight: 600;"><a
													href="http://localhost:4200/#/reset-password?email=${req.body.email}" class="btn btn-primary">R??initialiser mon mot de passe</a></p>
											<h3>A tr??s vite chez Mummy's Food !</h3>
										</div>
									</td>
								</tr>
							</table>
						</td>
					</tr><!-- end tr -->
				</table>
				<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
					style="margin: auto;">
					<tr>
						<td valign="middle" class="footer email-section">
							<table>
								<tr>
									<td valign="top" width="33.333%">
										<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
											<tr>
												<td style="text-align: left; padding-bottom: 20px;">
													<h3 class="heading">
														<span style="font-weight: 600;">MUMMY'S</span> FOOD
													</h3>
													<p style="margin: 0; font-size: 12px;">
														<a href="" style="display: flex; align-items: center; color: white !important;">
															<svg fill="white" version="1.1" id="Layer_1"
																xmlns="http://www.w3.org/2000/svg"
																xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
																viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;"
																xml:space="preserve">
																<path d="M256,0C161.896,0,85.333,76.563,85.333,170.667c0,28.25,7.063,56.26,20.49,81.104L246.667,506.5
																		c1.875,3.396,5.448,5.5,9.333,5.5s7.458-2.104,9.333-5.5l140.896-254.813c13.375-24.76,20.438-52.771,20.438-81.021
																		C426.667,76.563,350.104,0,256,0z M256,256c-47.052,0-85.333-38.281-85.333-85.333c0-47.052,38.281-85.333,85.333-85.333
																		s85.333,38.281,85.333,85.333C341.333,217.719,303.052,256,256,256z" />
															</svg>
															<span style="margin-left: 10px;">
																32 rue du Foss?? Mignard
																77700 CHESSY, France
															</span>
														</a>
														<a href="mailto:contact@dressingfmr.com"
															style="display: flex; align-items: center; color: white !important;">
															<svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
																xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
																viewBox="0 0 230.17 230.17"
																style="enable-background:new 0 0 230.17 230.17;" xml:space="preserve">
																<path
																	d="M230,49.585c0-0.263,0.181-0.519,0.169-0.779l-70.24,67.68l70.156,65.518c0.041-0.468-0.085-0.94-0.085-1.418V49.585z" />
																<path d="M149.207,126.901l-28.674,27.588c-1.451,1.396-3.325,2.096-5.2,2.096c-1.836,0-3.672-0.67-5.113-2.013l-28.596-26.647
			L11.01,195.989c1.717,0.617,3.56,1.096,5.49,1.096h197.667c2.866,0,5.554-0.873,7.891-2.175L149.207,126.901z" />
																<path d="M115.251,138.757L222.447,35.496c-2.427-1.443-5.252-2.411-8.28-2.411H16.5c-3.943,0-7.556,1.531-10.37,3.866
								L115.251,138.757z" />
																<path
																	d="M0,52.1v128.484c0,1.475,0.339,2.897,0.707,4.256l69.738-67.156L0,52.1z" />
															</svg>
															<span style="margin-left: 10px;">contact@dressingfmr.com</span>
														</a>
														<a href="tel:0617925189"
															style="display: flex; align-items: center; color: white;">
															<svg fill="white" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
																xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
																viewBox="0 0 387.2 387.2" style="enable-background:new 0 0 387.2 387.2;"
																xml:space="preserve">
																<path d="M304.8,10.84l0-0.04C297.927,3.891,288.585,0.004,278.84,0H108.32C88.067,0.066,71.666,16.467,71.6,36.72v313.72
																	c0.004,9.745,3.891,19.087,10.8,25.96c6.863,6.899,16.189,10.785,25.92,10.8h170.56c9.731-0.015,19.057-3.901,25.92-10.8
																	c6.899-6.863,10.785-16.189,10.8-25.92V36.76C315.585,27.029,311.699,17.703,304.8,10.84z M193.6,362.28L193.6,362.28
																	c-5.479,0-9.92-4.441-9.92-9.92c0-5.479,4.441-9.92,9.92-9.92c5.479,0,9.92,4.441,9.92,9.92
																	C203.52,357.839,199.079,362.28,193.6,362.28z M286.44,300c0,13.255-10.745,24-24,24H124.72c-13.255,0-24-10.745-24-24V66.2
																	c0-13.255,10.745-24,24-24h137.76c13.255,0,24,10.745,24,24L286.44,300z" />
															</svg>
															<span style="margin-left: 10px;">0617925189</span>
														</a>
													</p>
												</td>
											</tr>
											<tr style="border-top: 0.5px solid rgba(255, 255, 255, 0.664);">
												<td>
													<div
														style="display: flex; flex-direction: row; justify-content: center; margin-top: 15px;">
														<a style="margin: 0 15px 0 0;" href="//www.facebook.com/dressingfmr">
															<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 16 16"
																class="d6 d7 bs bt">
																<path
																	d="M14.667 0H1.333C.597 0 0 .597 0 1.333v13.334C0 15.403.597 16 1.333 16h7.334v-6h-2V7.333h2V5.61c0-2.067 1.262-3.192 3.106-3.192.883 0 1.642.066 1.863.095v2.16h-1.279c-1.002 0-1.196.477-1.196 1.176v1.485h2.96L13.454 10h-2.293v6h3.506c.736 0 1.333-.597 1.333-1.333V1.333C16 .597 15.403 0 14.667 0z">
																</path>
															</svg>
														</a>
														<a style="margin: 0 15px 0 0;" href="//www.twitter.com/dressingfmr">
															<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 14 12"
																class="d6 d7 bs bt">
																<path fill-rule="evenodd" clip-rule="evenodd"
																	d="M13.973 1.429a5.556 5.556 0 01-1.649.476A3.02 3.02 0 0013.587.231c-.554.34-1.169.59-1.823.728A2.792 2.792 0 009.668 0c-1.585 0-2.87 1.356-2.87 3.025 0 .24.026.47.074.692-2.385-.12-4.5-1.328-5.916-3.154-.249.443-.388.96-.388 1.522 0 1.051.507 1.976 1.276 2.52a2.754 2.754 0 01-1.3-.378v.036c0 1.467.988 2.692 2.302 2.97a2.776 2.776 0 01-1.29.052c.368 1.202 1.426 2.077 2.685 2.102A5.566 5.566 0 010 10.641 7.856 7.856 0 004.407 12c5.282 0 8.168-4.611 8.168-8.604 0-.13 0-.259-.01-.388.56-.424 1.05-.959 1.435-1.567l-.027-.012z">
																</path>
															</svg>
														</a>
														<a style="margin: 0 15px 0 0;" href="//www.instagram.com/dressingfmr">
															<svg fill="white" aria-hidden="true" focusable="false" viewBox="0 0 16 16"
																class="d6 d7 bs bt">
																<path fill-rule="evenodd" clip-rule="evenodd"
																	d="M8 0C5.827 0 5.555.01 4.702.048 3.85.088 3.27.222 2.76.42a3.908 3.908 0 00-1.417.923c-.445.444-.72.89-.923 1.417-.198.51-.333 1.09-.372 1.942C.008 5.555 0 5.827 0 8s.01 2.445.048 3.298c.04.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.72 1.417.923.51.198 1.09.333 1.942.372.853.04 1.125.048 3.298.048s2.445-.01 3.298-.048c.852-.04 1.433-.174 1.942-.372a3.908 3.908 0 001.417-.923c.445-.444.72-.89.923-1.417.198-.51.333-1.09.372-1.942.04-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.852-.174-1.433-.372-1.942a3.908 3.908 0 00-.923-1.417A3.886 3.886 0 0013.24.42c-.51-.198-1.09-.333-1.942-.372C10.445.008 10.173 0 8 0zm0 1.44c2.136 0 2.39.01 3.233.048.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.05 3.233c-.04.78-.17 1.203-.28 1.485-.15.374-.32.64-.6.92-.28.28-.55.453-.92.598-.28.11-.71.24-1.49.276-.85.038-1.1.047-3.24.047s-2.39-.01-3.24-.05c-.78-.04-1.21-.17-1.49-.28a2.49 2.49 0 01-.92-.6c-.28-.28-.46-.55-.6-.92-.11-.28-.24-.71-.28-1.49-.03-.84-.04-1.1-.04-3.23s.01-2.39.04-3.24c.04-.78.17-1.21.28-1.49.14-.38.32-.64.6-.92.28-.28.54-.46.92-.6.28-.11.7-.24 1.48-.28.85-.03 1.1-.04 3.24-.04L8 1.44zm0 2.452a4.108 4.108 0 100 8.215 4.108 4.108 0 000-8.215zm0 6.775a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm5.23-6.937a.96.96 0 11-1.92 0 .96.96 0 011.92 0z">
																</path>
															</svg>
														</a>
													</div>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td style="text-align: center; font-size: 10px; background: #f7f0e6;">
							<p style="color: #cecece">Ceci est un email automatique, merci de ne pas y r??pondre.</a></p>
						</td>
					</tr>
				</table>
	
			</div>
		</center>
	</body>
	
	</html>`;

	var mailOptions = {
		from: 'Mummy\'s Food <contact@dressingfmr.com>', //replace with your email
		to: 'dphengsiaroun@gmail.com', //replace with your email
		subject: `Reinitialiser votre mot de passe`,
		html: templateEmail
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
			res.json({
				error: error.message
			}) // if error occurs send error as response to client
		} else {
			console.log('Email for contact sent: ' + info.response);
			res.json({
				message: 'Email sent with successfully'
			}) //if mail is sent successfully send Sent successfully as response
		}
	});
})


module.exports = router;