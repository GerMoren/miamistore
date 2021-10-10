// import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import { AppBar, Toolbar } from "@material-ui/core";

const favicon = "🌝";

type Props = {
  title: string;
  children?: React.ReactNode;
};

function Logo({ title }: Props) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${favicon}</text></svg>`}
        ></link>
      </Head>
      <Typography variant="h4" className="flex-grow" component="h1">
        <Link href="/">{title}</Link>
      </Typography>
    </>
  );
}

export function NavBar({ title, children }: Props) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className="border-b-2 border-t-2 border-grey-200"
    >
      <Toolbar>
        <Logo title={title} />
        {children}
      </Toolbar>
    </AppBar>
  );
}
