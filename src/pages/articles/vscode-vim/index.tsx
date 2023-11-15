import ArticleLayout from "../../../components/article-layout/article-layout";

const VscodeVimArticle = () => {
  return (
    <ArticleLayout>
      {/* TODO: have a skip to tutorial link */}
      <div className="flex flex-col">
        <p className="self-center text-2xl">Driving VSCode with Neovim</p>
        <p className="self-center text-lg">and why you should try it</p>
        <br />
        <p className="self-center text-xl">I wanted to try Vim</p>
        <br />
        <p>
          Like anyone who had seen a few Primeagen videos, vim (specifically
          neovim) seemed like a very fun tool to try. I've been playing video
          games for a long time, and the idea that I could turn coding into
          something that feels more like a video game was definitely appealing.
          I decided that day I would try and make the switch.
        </p>
        <br />
        <p>
          Since diving straight into neovim would be a long process of both
          learning and configuration, I decided to get my feet wet with the vim
          VSCode extension. However, I quickly ran into one major problem with
          the extension. While it supported some great plugins and emulated vim
          well, there was a huge lag between a keypress, and the action on the
          screen. It felt like coding on 90 ping, and brought me back to the
          days of playing Xbox 360 on a terrible connection. To me, this was
          unacceptable, and I needed to find a new solution.
        </p>
        <br />
        <p className="self-center text-xl">Diving into Neovim</p>
        <br />
        <p>
          I then decided to just try switching to Neovim. This was also a
          problem for me. I had been using VSCode for about 4 years at this
          point, and losing both my keybindings and my extensions proved
          problematic for my job performance that day. Configuring Neovim myself
          with no experience in the editor proved to be a daunting task, and I
          re-evaluated my options.
        </p>
        <br />
        <p>
          While there were some cool presets like LunarVim or ChadNvim, these
          were still akin to learning a completely new editor. And since this
          was the middle of the week, I could not spend the workday setting up
          an editor to my liking (this would also take much more than a day to
          set up.)
        </p>
        <br />
        <br />
        <p className="self-center text-xl">
          Enter Vscode Neovim (the extension)
        </p>
        <br />
        <p>
          I found salvation by looking at the next extension after vim.
          Vscode-Neovim is an extension that uses a <em>real instance</em> of
          Neovim to control vscode. It does this by using vim as a backend for
          normal mode. This extension also has a very clever API that allows
          VSCode and Neovim to communicate with each other. This is real Neovim,
          it just lives inside of the editor I'm already comfortable with.
        </p>
        <br />
        <p>
          When writing the title of this article, I chose the word "Driving".
          This is because VSCode is still the editor. All the intellisense,
          plugins, auto complete, ect are VSCode. When using insert mode, I'm
          using purely VSCode with basically no Vim bindings.
        </p>
        <br />
        <p className="self-center text-xl">How to set it up</p>
        <br />
        <p>
          If you don't like / don't want to configure Neovim, you might want to
          consider checking out my dotfiles repo. I've got a neovim setup with
          some sensible plugins and defaults. Neovim also works normally without
          vscode (see below for more info on that).
        </p>
      </div>
      <br />
    </ArticleLayout>
  );
};

export default VscodeVimArticle;
