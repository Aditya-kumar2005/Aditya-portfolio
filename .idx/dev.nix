{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_22
  ];
  idx.extensions = [
    
  
 "google.gemini-cli-vscode-ide-companion"];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}