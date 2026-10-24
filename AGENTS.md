<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All product-image surfaces use the shared ProductImage component for uncropped photos and consistent missing/broken-image fallback.
- Imported or downloaded approved media is stored through Lovable Assets pointers; original photo files remain unmodified to keep the repository lightweight and imagery faithful.
