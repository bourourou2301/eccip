<script lang="ts">
    import {loginWithMail, email, password} from './+page';
</script>

<h1> BIENVENUE DANS ECCIP </h1>
<h3>Veuillez-vous connecter ou créer un compte</h3>

<div class="login-form">
    <h1>Login</h1>
    <form on:submit={loginWithMail}>
     <input bind:value={email} type="text" placeholder="Email" />
     <input bind:value={password} type="password" placeholder="Password" />
     <button type="submit">Login</button>
    </form>
   
    <div>or</div>
   
    <div>Don't you have an account? <a href="/register"> Register</a></div>
   </div>

<style>    
    * {
        margin: 0;
    }
    
    
    h1, h3 {
        text-align: center;
        font-family: 'Courier New', Courier, monospace;
    }
    </style>